const mongoose = require("mongoose");
const flights = mongoose.Schema({
    source:{
        type: String,
        reqiured: true,
    },
    destination:{
        type: String,
        reqiured: true,
    },
    price:{
        type: Number,
        reqiured: true,
    },
    airline:{
        type: String,
        reqiured: true,
    },
    name:{
        type:String,
        required:true
    },
    date:{
        type: Date,
        reqiured:true
    },
    dept:{
        type: String,
        reqiured: true,
    },
    arr:{
        type: String,
        reqiured: true,
    }
})

module.exports = mongoose.model("flights", flights);