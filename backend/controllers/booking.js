const flights = require("../model/flights");
const UserSchemaFlight = require("../model/user");

const addTraveller = async(req,res)=>{
    try {
        const {id,name,birthdate} = req.body;
        const user = await UserSchemaFlight.findById(id);
        console.log(user)
        if(!user){
            return res.status(400).send({status:"not ok",msg:"user not found"});
        }
        const update = await UserSchemaFlight.findByIdAndUpdate(id,{$push:{travellers:{name,birthdate}}});
        if(!update){
            return res.status(400).send({status:"not ok",msg:"traveller not added"});
        }
        return res.status(200).send({status:"ok",msg:"traveller added"});
    } catch (error) {
        console.log(error);
    }
}

const getTravellers = async(req,res)=>{
    try {
        const {id} = req.body;
        const user = await UserSchemaFlight.findById(id);
        console.log(user)
        if(!user){
            return res.status(400).send({status:"not ok",msg:"user not found"});
        }
        const update = await UserSchemaFlight.findByIdAndUpdate(id,{$push:{travellers:{name,birthdate}}});
        if(!update){
            return res.status(400).send({status:"not ok",msg:"traveller not added"});
        }
        return res.status(200).send({status:"ok",msg:"traveller added"});
    } catch (error) {
        console.log(error);
    }
}

const addBooking = async(req,res)=>{
    try {
        const {id,bookingId,name,src,dest,airline,fare,travellers} = req.body;
        const user = UserSchemaFlight.findById(id);
        if(!user){
            return res.status(400).send({status:"not ok",msg:"user not found"});
        }
        const checkFlight = await flights.findOne({name:name});
        if(!checkFlight){
            return res.status(400).send({status:"not ok",msg:"flight not found"});
        }
        const updateBooking = await UserSchemaFlight.findByIdAndUpdate(id,{$push:{bookings:{bookingId,name,src,dest,airline,fare,travellers}}});
        if(!updateBooking){
            return res.status(400).send({status:"not ok",msg:"booking not added"});
        }
        return res.status(200).send({status:"ok",msg:"booking added"});
    } catch (error) {
        console.log(error)
    }
}

const cancelBooking = async(req,res)=>{
    try {
        const {id,bookingId} = req.body;
        const user = UserSchemaFlight.findById(id);
        if(!user){
            return res.status(400).send({status:"not ok",msg:"user not found"});
        }
        const updateBooking = await UserSchemaFlight.findByIdAndUpdate(id,{$pull:{bookings:{bookingId}}});
        if(!updateBooking){
            return res.status(400).send({status:"not ok",msg:"booking not cancelled"});
        }
        return res.status(200).send({status:"ok",msg:"booking cancelled"});
    } catch (error) {
        console.log(error)
        
    }
}
module.exports = {addTraveller,addBooking,cancelBooking}