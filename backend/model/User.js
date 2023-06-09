const mongoose = require("mongoose");
const UserSchemaFlight = mongoose.Schema({
    name:{
        type: String,
        reqiured: true,
    },
    email:{
        type: String,
        unique: true,
        reqiured: true,
    },
    password:{
        type: String,
        reqiured: true,
    },
    birthdate:{
        type:Date,
        reqiured:true
    },
    travellers:{
        type: Array,
        defaul:[]
    },
    bookings:{
        type: Array,
        defaul:[]
    }
})

module.exports = mongoose.model("UserSchemaFlight", UserSchemaFlight);