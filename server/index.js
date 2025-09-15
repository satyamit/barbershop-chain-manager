const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const EmployeeModel = require("./Models/Employee");
const BranchModel = require("./Models/CreateBranch");
const ChairDetailsModel = require("./Models/ChairDetails");
const ServiceModel = require("./Models/ServicePage");
const UserModel = require("./Models/Users");
const CustomerModel = require("./Models/Customer");
const app = express();
app.use(express.json());
app.use(cors());

const twilio = require("twilio");
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;
// mongoose
//   .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log(" MongoDB connected"))
//   .catch((err) => console.error("MongoDB connection error:", err));
mongoose.connect(process.env.MONGO_URI);

mongoose.set("debug", true); // log mongo series

app.get("/health", (req, res) => res.send("OK"));

//mongoose.connect("mongodb://127.0.0.1:27017/branchManager");
//mongodb://localhost:27017/

// app.post('/register', (req,res)=>{
//     EmployeeModel.create(req.body)
//     .then(employees => res.json(employees))
//     .catch(err => res.json(err))
// })

//check if admin exists
app.get("/check-admin", async (req, res) => {
  const admin = await UserModel.findOne({ role: "admin" });
  res.json({ exists: !!admin });
});

//  Register route
app.post("/signup", async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (role === "admin") {
      // only one admin can exists
      const existingAdmin = await UserModel.findOne({ role: "admin" });
      if (existingAdmin) {
        return res.status(403).json({ message: "Admin already exists!" });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserModel({ email, password: hashedPassword, role });
    await user.save();
    res.json({ message: `${role} gernerated successfully` });

    // if (existingUser) {
    //   return res.status(400).json({ message: "Email already registered" });
    // }

    // // Create new user
    // const newUser = await EmployeeModel.create({ email, password });
    // res.status(200).json({ message: "Registration successful", user: newUser });
  } catch (err) {
    console.error("SignUp error", err);
    res
      .status(500)
      .json({ message: "Registration Failed", error: err.message });
  }
});

//Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

// app.post("/createbranch", (req, res) => {
//   BranchModel.create(req.body)
//     .then((branch) => res.json(branch))
//     .catch((err) => res.json(err));
// });

app.post("/createbranch", async (req, res) => {
  try {
    const { name, location, chairs, managerEmail, managerPassoword } = req.body;

    //create branch
    const newBranch = new BranchModel({
      name,
      location,
      chairs,
    });
    const savedBranch = await newBranch.save();

    //Create the manager (linked to branch)
    if (managerEmail && managerPassoword) {
      const hashedPassword = await bcrypt.hash(managerPassoword, 10);

      const manager = new UserModel({
        email: managerEmail,
        password: hashedPassword,
        role: "manager",
        branchId: savedBranch._id,
      });
      await manager.save();
    }

    res
      .status(200)
      .json({ message: "Branch and Manager created successfully" });
  } catch (err) {
    console.error("Error creating branch & manager:", err);
    res.status(500).json({ message: "Failed to create branch & manager" });
  }
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

// Get all chairs for a specific branch
// app.get("/getchairdetails/:branchId", async (req, res) => {
//   try {
//     const { branchId } = req.params;
//     console.log("Fetching chairs for branchId:", branchId);

//     // Assuming your chairs collection has branchId field
//     //const chairs = await Chairs.find({ branchId: branchId });
//     const chairs = await ChairDetailsModel.find({branchId});

//     if (!chairs || chairs.length === 0) {
//       return res.status(404).json({ message: "No chairs found for this branch" });
//     }

//     res.json(chairs);
//   } catch (err) {
//     console.error("Error fetching chairs:", err);
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
app.post("/servicepage", async (req, res) => {
  try {
    const { branchId, branchName, chairNumber, employeeName, services } =
      req.body;

    if (
      !branchId ||
      !branchName ||
      !chairNumber ||
      !employeeName ||
      !services.length
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const branch = await BranchModel.findById(branchId);
    if (!branch) {
      return res.status(404).json({ error: "Branch not found" });
    }

    const newService = new ServiceModel({
      branchId,
      branchName: branch.name,
      chairNumber,
      employeeName,
      services,
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

//     console.log("Query received:", req.query);

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
//       console.log("Date range:", filter.createdAt);
//     } else {
//       console.log("⏱️ No date filter applied");
//     }

//     const report = await ServiceModel.find(filter).sort({ createdAt: 1 });
//     console.log("MongoDB result count:", report.length);

//     res.json(report);
//   } catch (err) {
//     console.error("Error fetching report:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

app.get("/getreport", async (req, res) => {
  try {
    const { branchId, startDate, endDate } = req.query;

    console.log("Query received:", req.query);

    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    console.log("Converted dates:", start, end);

    const report = await ServiceModel.find({
      branchId: new mongoose.Types.ObjectId(branchId),
      createdAt: { $gte: start, $lte: end },
    });

    console.log("MongoDB result:", report);

    res.json(report);
  } catch (err) {
    console.error("Error fetching report:", err);
    res.status(500).json({ error: "Server error" });
  }
});

//registerpage
app.post("/registerpage", async (req, res) => {
  try {
    const { username, password, role } = req.body;

    //check if any admin exists
    const existingAdmin = await UserModel.findOne({ role: "admin" });

    let finalRole = role || "manager";
    if (!existingAdmin) {
      finalRole = "admin";
    } else if (role === "admin") {
      return res
        .status(403)
        .json({ message: "Only an existing Admin can create another Admin" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      username,
      password: hashedPassword,
      role: finalRole,
    });
    await newUser.save();

    res.json({ message: "User registered", role: finalRole });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "User registered", role: finalRole });
  }
});

app.post("/loginpage", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });

    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // generate JWT
    const token = jwt.sign({ id: user._id, role: user.role }, "secretkey", {
      expiresIn: "1d",
    });

    res.json({ message: "Login successful", role: user.role, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
});

app.post("/add-user", async (req, res) => {
  try {
    const { username, password, role } = req.body;

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only Admin can add new users" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ username, password: hashedPassword, role });
    await newUser.save();

    res.json({ message: "New user created", role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating user" });
  }
});

//add a new customer
app.post("/customer", async (req, res) => {
  try {
    const { customerName, mobile, amount, paymentmode } = req.body;

    if (!customerName || !mobile || !amount || !paymentmode) {
      return res.status(400).json({ error: "All fields are required:" });
    }

    const customer = new CustomerModel({
      customerName,
      mobile,
      amount,
      paymentmode,
    });

    await customer.save();

    //send whatsapp message
    const formattedNumber = `whatsapp:+91${mobile}`;
    const message = await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: formattedNumber,
      body: `Hi ${customerName}, thanks for visiting! We hope to see you again soon 💇‍♂️✂️`,
    });

    res.json({ success: true, message: "Customer added and WhatsApp sent!" });
  } catch (err) {
    console.error("Error adding customer: ", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post("/send-whatsapp", async (req, res) => {
  try {
    const { mobile, customerName } = req.body;

    // Format: whatsapp:+91xxxxxxxxxx
    const formattedNumber = `whatsapp:+91${mobile}`;

    const message = await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: formattedNumber,
      body: `Hi ${customerName}, thanks for visiting! We hope to see you again soon 💇‍♂️✂️`,
    });

    res.json({ success: true, sid: message.sid });
  } catch (err) {
    console.error("WhatsApp send error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
