const mongoose = require('mongoose');
const ChairSchema = new mongoose.Schema({
    branchName: String,
    chairNumber: Number,
    employeeName: String,
})

const ChairModel = mongoose.model("chair",ChairSchema);
module.exports = ChairModel;
