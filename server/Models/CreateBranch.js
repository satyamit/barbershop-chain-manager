const mongoose = require('mongoose');
const BranchSchema = new mongoose.Schema({
    name: String,
    location: String,
    chairs: Number,
})
const BranchModel = mongoose.model("branch",BranchSchema);
module.exports = BranchModel;