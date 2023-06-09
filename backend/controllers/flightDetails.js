const flights = require("../model/flights");

// Function to add a flight
const addFlight = async(req,res)=>{
    try {
        const {destination,source,price,airline,name,date,dept,arr} = req.body; // Destructuring the request body
        const flight = await flights.create({destination,source,price,airline,name,date,dept,arr}); // Creating a new flight
        if(!flight){
            return res.status(400).send({status:"not ok",msg:"flight not added"});
        }
        return res.status(200).send({status:"ok",msg:"flight added"});
    } catch (error) {
        console.log(error);
    }
}

// Function to get the flights
const getFlights = async(req,res)=>{
    try {
        const {source,destination,date} = req.body; // Destructuring the request body
        console.log(typeof(date));
        var datee = new Date(date);
        // var newDate = new Date(datee.toISOString());
        datee.setHours(0,0,0,0)
        let dateStr = datee.toISOString();
        console.log(dateStr);
        // date+="T18:30:00.000+00:00"
        const flight = await flights.find({source:source,destination:destination,date:dateStr}); // Finding the flight using the source, destination and date
        if(!flight){
            return res.status(400).send({status:"not ok",msg:"no direct flights found for this route"});
        }
        return res.status(200).send(flight);
    } catch (error) {
        console.log(error)
    }
}

module.exports = {addFlight,getFlights}