import axios from 'axios';
import React, { useState } from 'react'
import { Link } from "react-router-dom";

const CreateBranch = () => {
    const[name,setName] = useState('');
    const[location,setLocation] = useState('');
    const[chairs,setChairs] = useState('');
    const handleSubmit = (e) =>{
        e.preventDefault();
        axios.post('http://localhost:3001/createbranch',{name,location,chairs})
        .then(result=> console.log("create branch result",result))
        .catch(err=> console.log("create branch error",err))
    }
  return (
    <div>
        <h2>Create Branch</h2>
        <form action="" onSubmit={handleSubmit}>
            <input
                type="text" 
                placeholder='Branch Name' 
                value={name}
                onChange={(e)=> setName(e.target.value)}
            />
            <input 
                type="text" 
                placeholder='Location'
                value={location}
                onChange={(e)=> setLocation(e.target.value)}
            />
            <input 
                type="text" 
                placeholder='Chairs' 
                value={chairs}
                onChange={(e)=> setChairs(e.target.value)}
            />
            <button type='submit'>Create Branch</button>
        </form>
        <div>
            Show me the branch details
            <Link to="/branchlist">Show Branch</Link>
        </div>
    </div>
  )
}

export default CreateBranch
