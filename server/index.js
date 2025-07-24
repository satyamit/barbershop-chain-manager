const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const EmployeeModel = require('./Models/Employee');
const BranchModel = require('./Models/CreateBranch');

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/employee");
//mongoose.connect("mongodb://127.0.0.1:27017/branchManager");
//mongodb://localhost:27017/

app.post('/register', (req,res)=>{
    EmployeeModel.create(req.body)
    .then(employees => res.json(employees))
    .catch(err => res.json(err))
})

app.post('/createbranch', (req,res)=>{
    BranchModel.create(req.body)
    .then(branch => res.json(branch))
    .catch(err => res.json(arr))
})

app.get('/getbranches',(req,res)=>{
    BranchModel.find()
    .then(branches => res.json(branches))
    .catch(err => res.json(err))
})
app.listen(3001,()=>{
    console.log("Server is running");
});
