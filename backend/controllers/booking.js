const flights = require("../model/flights");
const UserSchemaFlight = require("../model/user");

// Function to add a traveller
const addTraveller = async(req,res)=>{
    try {
        const {id,name,birthdate} = req.body; // Destructuring the request body
        const user = await UserSchemaFlight.findById(id); // Finding the user with the id
        console.log(user)
        if(!user){
            return res.status(400).send({status:"not ok",msg:"user not found"}); // If user is not found, return an error
        }
        const update = await UserSchemaFlight.findByIdAndUpdate(id,{$push:{travellers:{name,birthdate}}}); // If user is found, add the traveller
        if(!update){
            return res.status(400).send({status:"not ok",msg:"traveller not added"}); // If traveller is not added, return an error
        }
        return res.status(200).send({status:"ok",msg:"traveller added"}); // If traveller is added, return a success message
    } catch (error) {
        console.log(error);
    }
}

// function to get the travellers list of a user from database
const getTravellers = async(req,res)=>{
    try {
        const {id} = req.body;
        // const user = await UserSchemaFlight.findById(id); 
        console.log(user)
        if(!user){
            return res.status(400).send({status:"not ok",msg:"user not found"});
        }
        return res.status(200).send({status:"ok",msg:"traveller added",travellers:user.travellers}); // If user is found, return the travellers list
    } catch (error) {
        console.log(error);
    }
}


// Function to add a booking
const addBooking = async(req,res)=>{
    try {
        const {id,bookingId,name,src,dest,airline,fare,travellers} = req.body; // Destructuring the request body
        const user = UserSchemaFlight.findById(id); // Finding the user with the id
        if(!user){
            return res.status(400).send({status:"not ok",msg:"user not found"});
        }
        const checkFlight = await flights.findOne({name:name}); // Finding the flight with the name
        if(!checkFlight){
            return res.status(400).send({status:"not ok",msg:"flight not found"});
        }
        const updateBooking = await UserSchemaFlight.findByIdAndUpdate(id,{$push:{bookings:{bookingId,name,src,dest,airline,fare,travellers}}}); // If flight is found, add the booking
        if(!updateBooking){
            return res.status(400).send({status:"not ok",msg:"booking not added"});
        }
        return res.status(200).send({status:"ok",msg:"booking added"});
    } catch (error) {
        console.log(error)
    }
}

// Function to cancel a booking
const cancelBooking = async(req,res)=>{
    try {
        const {id,bookingId} = req.body; // Destructuring the request body
        const user = UserSchemaFlight.findById(id); // Finding the user with the id
        if(!user){
            return res.status(400).send({status:"not ok",msg:"user not found"});
        }
        const updateBooking = await UserSchemaFlight.findByIdAndUpdate(id,{$pull:{bookings:{bookingId}}}); // If user is found, cancel the booking
        if(!updateBooking){
            return res.status(400).send({status:"not ok",msg:"booking not cancelled"});
        }
        return res.status(200).send({status:"ok",msg:"booking cancelled"});
    } catch (error) {
        console.log(error)
        
    }
}
module.exports = {addTraveller,addBooking,cancelBooking,getTravellers}