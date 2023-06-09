const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserSchemaFlight = require("../model/user");
const validations = require("../middleware/validations")

// Function to login a user
const Login = async (req, res) => {
    try {
      const {email, password}=req.body; // Destructuring the request body
      const user = await UserSchemaFlight.findOne({email}); // Finding the user with the email
      if (!user){
          return res.status(400).send({ status: "not ok", msg: "user not found" });
        }
        const match= await bcrypt.compare(password,user.password); // If user is found, compare the password
        console.log(match)
      if(match){ 
          const { _id} = user;
          const token = jwt.sign({ _id, email }, process.env.SECRET_KEY); // If password matches, create a token
          return res.status(200).json({ status: "ok", token });
      }
      else{
          return res.status(400).send({ status: "not ok" });
      }
    } catch (error) {
      console.log(error);
    }
};

// Function to register a user
const Register = async (req, res) => {
    try {
        const {name,email, password:plainTextPassword} = req.body; // Destructuring the request body
        console.log(req.body)
        const passwordValidation =  validations.passwordValidation(req.body.password) // Validating the password
        if(!passwordValidation){
            window.alert("Password should be 8 character long and contain atleast one special character") 
            return res.status(400).send({ status: "not ok", msg: "password is not strong" }); // If password is not strong, return an error
        }
        password = await bcrypt.hash(plainTextPassword,10); // If password is strong, hash the password
        console.log(password)
        const unique = await UserSchemaFlight.findOne({email}); // Check if the user already exists
        if(unique){
            return res.status(400).send({ status: "not ok", msg: "user already exists with this email address" }); // If user already exists, return an error
        }
        const user = await UserSchemaFlight.create({name,email, password}); // If user does not exist, create a new user
        console.log(user)
        if (!user) {
        return res.status(400).send({ status: "not ok", msg: "user not created" }); // If user is not created, return an error
        }
        return res.status(200).send({ status: "ok", msg: "user created" }); // If user is created, return a success message
    } catch (error) {
        console.log(error);
    }
}

// Function to change the password of a user
const changePassword = async(req,res)=>{
    try {
        const {newPassword:plainTextPassword}=req.body; // Destructuring the request body
        validations.validateUser(req.user,req.body.emailId); // Validating the user
        const user = await UserSchemaFlight.findOne({emailId:req.body.emailId}); // Finding the user with the email
        if(!user){
            return res.status(400).send({status:"not ok",msg:"User does not exist"});
        }
        validations.notNull(req.body.oldPassword) // Validating the old password
        validations.passwordValidation(req.body.newPassword) // Validating the new password
        // console.log(req.body.oldPassword)
        const validOldpassword = await bcrypt.compare(req.body.oldPassword,user.password) // Comparing the old password with the password in the database
        if(!validOldpassword){
            return res.status(400).send({status:"not ok",msg:"Old Password does not match"}); // If old password does not match, return an error
        }
        newPassword = await bcrypt.hash(plainTextPassword,10); // If old password matches, hash the new password
        // Update the password in the database
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
module.exports = { Register,Login,changePassword};  