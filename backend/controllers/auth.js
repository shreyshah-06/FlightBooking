const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserSchemaFlight = require("../model/user");
const validations = require("../middleware/validations")


const Login = async (req, res) => {
    try {
      const {email, password}=req.body;
      const user = await UserSchemaFlight.findOne({email});
      if (!user){
          return res.status(400).send({ status: "not ok", msg: "user not found" });
        }
        const match= await bcrypt.compare(password,user.password);
        console.log(match)
      if(match){
          const { _id} = user;
          const token = jwt.sign({ _id, email }, process.env.SECRET_KEY);
          return res.status(200).json({ status: "ok", token });
      }
      else{
          return res.status(400).send({ status: "not ok" });
      }
    } catch (error) {
      console.log(error);
    }
};


const Register = async (req, res) => {
    try {
        // const data = req.body;
        const {name,email, password:plainTextPassword} = req.body;
        console.log(req.body)
        // console.log(plainTextPassword)
        const passwordValidation =  validations.passwordValidation(req.body.password)
        if(!passwordValidation){
            window.alert("Password should be 8 character long and contain atleast one special character")
            return res.status(400).send({ status: "not ok", msg: "password is not strong" });
        }
        password = await bcrypt.hash(plainTextPassword,10);
        console.log(password)
        const unique = await UserSchemaFlight.findOne({email});
        if(unique){
            return res.status(400).send({ status: "not ok", msg: "user already exists with this email address" });
        }
        const user = await UserSchemaFlight.create({name,email, password});
        console.log(user)
        if (!user) {
        return res.status(400).send({ status: "not ok", msg: "user not created" });
        }
        return res.status(200).send({ status: "ok", msg: "user created" });
    } catch (error) {
        console.log(error);
        // Abcdefgh@123
    }
}

const getUser = async(req,res)=>{
    try {
        if (!req.headers.authorization.startsWith("BEARER ")) {
          res.status(404).send({ status: "not ok", msg: "Invalid Request" });
        }
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, process.env.SECRET_KEY);
        const userData = await UserSchemaFlight.findOne(user);
        // console.log(userData)
        if (!userData) {
          res.status(400).send({ status: "not ok", msg: "user not found" });
        }
        res.status(200).send({ status: "ok", userData });
      } catch (error) {
        console.log(error);
    }
}

const changePassword = async(req,res)=>{
    try {
        const {newPassword:plainTextPassword}=req.body;
        validations.validateUser(req.user,req.body.emailId);
        const user = await UserSchemaFlight.findOne({emailId:req.body.emailId});
        if(!user){
            return res.status(400).send({status:"not ok",msg:"User does not exist"});
        }
        validations.notNull(req.body.oldPassword)
        validations.passwordValidation(req.body.newPassword)
        // console.log(req.body.oldPassword)
        const validOldpassword = await bcrypt.compare(req.body.oldPassword,user.password)
        if(!validOldpassword){
            return res.status(400).send({status:"not ok",msg:"Old Password does not match"});
        }
        newPassword = await bcrypt.hash(plainTextPassword,10);
        // console.log(newPassword)
        const updatePass = await UserSchemaFlight.updateOne({
            emailId: req.body.emailId
        }, {
            $set: {
                password: newPassword
            }
        })
        res.status(200).json({
            status: "Success",
            message: "Password update Success",
            userId: updatePass
        })

    } catch (error) {
        console.log(error)
    }
}
module.exports = { Register,Login,changePassword,getUser};  