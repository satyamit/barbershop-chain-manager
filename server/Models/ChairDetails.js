const mongoose = require('mongoose');
const ChairSchema = new mongoose.Schema({
    branchId: { 
    type: mongoose.Schema.Types.ObjectId,   // ✅ reference to Branch
    ref: "Branch",                          // optional, for population
    required: true 
  },
    branchName: String,
    chairNumber: Number,
    employeeName: String,
})

const ChairModel = mongoose.model("chair",ChairSchema);
module.exports = ChairModel;
