// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
//import './App.css'
//import Register from './Register.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './SignUp.jsx';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Login from './Login.jsx';
import CreateBranch from './CreateBranch.jsx';
import BranchList from './BranchList.jsx';

function App() {
  //const [count, setCount] = useState(0)
  console.log("App...");
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/register' element={<SignUp/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/createbranch' element={<CreateBranch/>}></Route>
            <Route path='/branchlist' element={<BranchList/>}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
