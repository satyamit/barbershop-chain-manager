import axios from 'axios';
import React, { useEffect, useState } from 'react'

const BranchList = () => {
  const[branches, setBranches] = useState([]);
  useEffect(()=>{
    axios.get('http://localhost:3001/getbranches')
    .then((res)=>{
      setBranches(res.data);
    })
    .catch((err)=>{
      console.log("Failed to fetch branches",err);
    })
  },[]);

  
  return (
    <div>
      <h2>All Branches</h2>
      <table style={{border:'1px solid black'}}>
        <thead style={{border:'1px solid black'}}>
          <tr>
            <th style={{border:'1px solid black'}}>Branch Name</th>
            <th>Location</th>
            <th>Chairs</th>
          </tr>
        </thead>
        <tbody>
          {
            branches.map((branch,index)=>(
              <tr key={index}>
                <td>{branch.name}</td>
                <td>{branch.location}</td>
                <td>{branch.chairs}</td>
                <td>{index}</td>
                <td><button>Details</button></td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default BranchList
