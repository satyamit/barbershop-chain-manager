// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import React, { useState } from 'react'
// import {auth} from './FirebaseConfig'
// const Register = () => {
//   const[email,setEmail]=useState('');
//   const[password,setPassword]=useState('');
//   const inputEmailChange = (e) =>{
//     setEmail(e.target.value)
//   }
//   const inputPasswordChange = (e) =>{
//     setPassword(e.target.value)
//   }
//   const handleRegister = async () =>{
//     try{
//       const userCredentials = await createUserWithEmailAndPassword(auth,email,password);
//       console.log('registered:',userCredentials);
//       alert('Registration Successful');
//     }catch(error){
//       alert(error.message);
//     }
//   }
//   return (
//     <div>
//       <h2>Register</h2>
//       <label htmlFor="">Admin Login</label>
//       <input type="text" placeholder='Enter Login ID: ' value={email} onChange={inputEmailChange} />
//       <label htmlFor="">Password</label>
//       <input type="password" placeholder='Enter Password: ' value={password} onChange={inputPasswordChange}/>
//       <button onClick={handleRegister}>Register</button>
//     </div>
//   )
// }

// export default Register
