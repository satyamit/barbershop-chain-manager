const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const EmployeeModel = require('./Models/Employee');
const BranchModel = require('./Models/CreateBranch');
const ChairDetailsModel = require('./Models/ChairDetails');

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

// app.post('/chairdetails',(req,res)=>{
//     ChairDetailsModel.create(req.body)
//     .then(chair => res.json(chair))
//     .catch(err => res.json(err))
// })

app.post('/chairdetails',async(req,res)=>{
    try{
        const {branchId, branchName,chairs} = req.body;
        
        const detailsChairs = chairs.map((chair)=>({
            branchId,
            branchName,
            chairNumber: chair.chairNumber,
            employeeName: chair.employeeName,
        }))

        await ChairDetailsModel.insertMany(detailsChairs);
        res.status(200).json({message: "Chair details saved successfully"})
    }catch(err){
        console.log("Error saving chairs: ",err);
        res.status(200).json({error: "Failed to save chair details"})
    }
})

app.get('/getchairdetails/:branchName', (req, res) => {
    const branchName = req.params.branchName;
    ChairDetailsModel.find({ branchName })
        .then(chairs => res.json(chairs))
        .catch(err => res.json(err));
});


app.get('/getallchairdetails',(req,res) =>{
    ChairDetailsModel.find()
        .then(chairs => res.json(chairs))
        .catch(err => res.json(err))
})

// app.get('/getchairdetailsbyname/:branchName',(req,res)=>{
//     const branchName 
// })


app.listen(3001,()=>{
    console.log("Server is running");
});
