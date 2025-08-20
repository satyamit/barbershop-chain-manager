const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./Models/Employee");
const BranchModel = require("./Models/CreateBranch");
const ChairDetailsModel = require("./Models/ChairDetails");
const ServiceModel = require("./Models/ServicePage");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/employee");
mongoose.set("debug",true); // log mongo series

app.get("/health",(req,res)=>res.send("OK"));

//mongoose.connect("mongodb://127.0.0.1:27017/branchManager");
//mongodb://localhost:27017/

// app.post('/register', (req,res)=>{
//     EmployeeModel.create(req.body)
//     .then(employees => res.json(employees))
//     .catch(err => res.json(err))
// })
// ✅ Register route
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if email already exists
    const existingUser = await EmployeeModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Create new user
    const newUser = await EmployeeModel.create({ email, password });
    res.status(200).json({ message: "Registration successful", user: newUser });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

// ✅ Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await EmployeeModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

app.post("/createbranch", (req, res) => {
  BranchModel.create(req.body)
    .then((branch) => res.json(branch))
    .catch((err) => res.json(arr));
});

app.get("/getbranches", (req, res) => {
  BranchModel.find()
    .then((branches) => res.json(branches))
    .catch((err) => res.json(err));
});

// app.post('/chairdetails',(req,res)=>{
//     ChairDetailsModel.create(req.body)
//     .then(chair => res.json(chair))
//     .catch(err => res.json(err))
// })

app.post("/chairdetails", async (req, res) => {
  try {
    const { branchId, branchName, chairs } = req.body;
    console.log("Incoming chairdetails request:", req.body);

    const detailsChairs = chairs.map((chair) => ({
      branchId,
      branchName,
      chairNumber: chair.chairNumber,
      employeeName: chair.employeeName,
    }));

    await ChairDetailsModel.insertMany(detailsChairs);
    res.status(200).json({ message: "Chair details saved successfully" });
  } catch (err) {
    console.log("Error saving chairs: ", err);
    res.status(200).json({ error: "Failed to save chair details" });
  }
});

// app.get("/getchairdetails/:branchName", (req, res) => {
//   const branchName = req.params.branchName;
//   ChairDetailsModel.find({ branchName })
//     .then((chairs) => res.json(chairs))
//     .catch((err) => res.json(err));
// });

// ✅ Get all chairs for a specific branch
// app.get("/getchairdetails/:branchId", async (req, res) => {
//   try {
//     const { branchId } = req.params;
//     console.log("📌 Fetching chairs for branchId:", branchId);

//     // Assuming your chairs collection has branchId field
//     //const chairs = await Chairs.find({ branchId: branchId });
//     const chairs = await ChairDetailsModel.find({branchId});

//     if (!chairs || chairs.length === 0) {
//       return res.status(404).json({ message: "No chairs found for this branch" });
//     }

//     res.json(chairs);
//   } catch (err) {
//     console.error("❌ Error fetching chairs:", err);
//     res.status(500).json({ error: "Failed to fetch chairs" });
//   }
// });

app.get("/getchairdetails/:branchId", (req, res) => {
  const branchId = req.params.branchId;
  ChairDetailsModel.find({ branchId })
    .then((chairs) => res.json(chairs))
    .catch((err) => res.json(err));
});

app.get("/getallchairdetails", (req, res) => {
  ChairDetailsModel.find()
    .then((chairs) => res.json(chairs))
    .catch((err) => res.json(err));
});

// app.get('/getchairdetailsbyname/:branchName',(req,res)=>{
//     const branchName
// })

// app.post("/servicepage",(req,res) =>{
//   ServiceModel.find()
//   .then((service) => res.json(service))
//   .catch((err) => res.json(err))
// })


// Save services for a chair
app.post('/servicepage', async (req, res) => {
  try {
    const { branchId, branchName, chairNumber, employeeName, services } = req.body;

    if (!branchId || !branchName || !chairNumber || !employeeName || !services.length) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const branch = await BranchModel.findById(branchId);
    if(!branch){
      return res.status(404).json({error: "Branch not found"});
    }

    const newService = new ServiceModel({
      branchId,
      branchName: branch.name,
      chairNumber,
      employeeName,
      services
    });

    await newService.save();
    res.status(200).json({ message: "Services saved successfully" });
  } catch (err) {
    console.error("Error saving services:", err);
    res.status(500).json({ error: "Failed to save services" });
  }
});

//Fetch report for a branch on a particular date
// app.get("/getreport/:branchId/:date", async (req, res) => {
//   try {
//     const { branchId, date } = req.params;

//     // Convert date string to start and end of day
//     const start = new Date(date);
//     const end = new Date(date);
//     end.setHours(23, 59, 59, 999);

//     const services = await ServiceModel.find({
//       branchId: new mongoose.Types.ObjectId(branchId),
//       createdAt: { $gte: start, $lte: end },
//     });

//     res.json(services);
//   } catch (err) {
//     console.error("Error fetching report:", err);
//     res.status(500).json({ error: "Failed to fetch report" });
//   }
// });

// app.get("/getreport", async (req, res) => {
//   try {
//     const { branchId, startDate, endDate } = req.query;

//     const query = {
//       branchId,
//       createdAt: {
//         $gte: new Date(startDate),
//         $lte: new Date(endDate),
//       },
//     };

//     const report = await ServiceModel.find(query);
//     res.json(report);
//   } catch (err) {
//     console.error("Error generating report:", err);
//     res.status(500).json({ error: "Failed to fetch report" });
//   }
// });

// Add this route in index.js ONLY FOR TESTING; remove later.
// Add this route in index.js ONLY FOR TESTING; remove later.
// app.post("/seed-service", async (req, res) => {
//   try {
//     const { branchId, branchName } = req.body; // provide these from your real branch

//     if (!branchId || !branchName) {
//       return res.status(400).json({ error: "branchId and branchName required" });
//     }

//     const doc = await ServiceModel.create({
//       branchId,
//       branchName,
//       chairNumber: 1,
//       employeeName: "Test Employee",
//       services: [
//         { serviceName: "Hair Cut", amount: 150 },
//         { serviceName: "Shave", amount: 80 },
//       ],
//       // createdAt will be auto-added (now)
//     });

//     res.json({ message: "Seeded", doc });
//   } catch (e) {
//     console.error(e);
//     res.status(500).json({ error: "Seed failed" });
//   }
// });

//testing
// index.js
// app.get("/getreport", async (req, res) => {
//   try {
//     const { branchId, branchName, startDate, endDate } = req.query;

//     console.log("🔥 Query received:", req.query);

//     const filter = {};

//     if (branchId && branchId !== "undefined") {
//       try {
//         filter.branchId = new mongoose.Types.ObjectId(branchId);
//       } catch {
//         return res.status(400).json({ error: "Invalid branchId" });
//       }
//     } else if (branchName) {
//       filter.branchName = branchName;
//     } else {
//       return res.status(400).json({ error: "branchId or branchName required" });
//     }

//     // Date filter (optional)
//     if (startDate && endDate) {
//       const start = new Date(startDate);
//       const end = new Date(endDate);
//       end.setHours(23, 59, 59, 999);
//       filter.createdAt = { $gte: start, $lte: end };
//       console.log("📅 Date range:", filter.createdAt);
//     } else {
//       console.log("⏱️ No date filter applied");
//     }

//     const report = await ServiceModel.find(filter).sort({ createdAt: 1 });
//     console.log("📊 MongoDB result count:", report.length);

//     res.json(report);
//   } catch (err) {
//     console.error("Error fetching report:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });


app.get("/getreport", async (req, res) => {
  try {
    const { branchId, startDate, endDate } = req.query;

    console.log("🔥 Query received:", req.query);

    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    console.log("📅 Converted dates:", start, end);

    const report = await ServiceModel.find({
      branchId: new mongoose.Types.ObjectId(branchId),
      createdAt: { $gte: start, $lte: end }
    });

    console.log("📊 MongoDB result:", report);

    res.json(report);
  } catch (err) {
    console.error("Error fetching report:", err);
    res.status(500).json({ error: "Server error" });
  }
});



app.listen(3001, () => {
  console.log("Server is running");
});
