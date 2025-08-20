// const mongoose = require('mongoose');
// const ServiceSchema = new mongoose.Schema({
//     serviceName: String,
//     amount: Number,
// })

// const ServiceModel = mongoose.model("services",ServiceSchema);
// module.exports = ServiceModel;

// const mongoose = require("mongoose");

// const ServiceSchema = new mongoose.Schema({
//   branchId: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true
//   },
//   branchName: String,
//   chairNumber: Number,
//   employeeName: String,
//   services: [
//     {
//       serviceName: String,
//       amount: Number
//     }
//   ],
//   date: {
//     type: Date,
//     default: Date.now
//   }
// });

// module.exports = mongoose.model("Service", ServiceSchema);

const mongoose = require("mongoose");

// const ServiceSchema = new mongoose.Schema(
//   {
//     branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },
//     branchName: { type: String, required: true },
//     chairNumber: { type: Number, required: true },
//     employeeName: { type: String, required: true },
//     services: [
//       {
//         serviceName: { type: String, required: true },
//         amount: { type: Number, required: true },
//       },
//     ],
//   },
//   { timestamps: true } // this gives createdAt & updatedAt automatically
// );
const ServiceSchema = new mongoose.Schema({
  branchId: mongoose.Schema.Types.ObjectId,
  branchName: String,
  chairNumber: Number,
  employeeName: String,
  services: [
    { serviceName: String, amount: Number }
  ]
}, { timestamps: true });  // <--- This adds createdAt & updatedAt

const ServiceModel = mongoose.model("Service", ServiceSchema);
module.exports = ServiceModel;