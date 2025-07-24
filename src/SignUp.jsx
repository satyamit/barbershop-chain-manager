import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');

    const handleSubmit = (e) =>{
        e.preventDefault();
        axios.post('http://localhost:3001/register',{email,password})
        .then(result => console.log("result",result))
        .catch(err => console.log("err",err))
    }
      
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div>
            <label htmlFor="">Email</label>
            <input type="text" placeholder='Your Email' onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div>
            <label htmlFor="">Password</label>
            <input type="text" placeholder='Your Password'onChange={(e)=>setPassword(e.target.value)}/>
        </div>
      
        <button type='submit'>Register</button>
        </form>
        <form action="">
          
        </form>
        <Link to="/login">Login</Link>
        
    </div>
  )
}

export default SignUp;
