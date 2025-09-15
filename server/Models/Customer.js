const mongoose = require("mongoose");
const CustomerSchema = new mongoose.Schema({
   
    customerName: String,
    mobile: String,
    paymentmode: {type: String, enum: ["cash","online"], required: true}, 
    amount:Number,
})

const CustomerModel = mongoose.model("customer",CustomerSchema);
module.exports = CustomerModel;