const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
    productimage:{
        type:String,
    },
    amount: {
        type:Number,
    },
    productname:{
        type:String,

    status:{
        type:String,
        default:"Pending"
    }
    },


})

module.exports = mongoose.model("Products", productsSchema)