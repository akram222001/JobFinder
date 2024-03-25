import React, {useEffect, useContext} from 'react'
import ' ./App.css';
import {Context} from './main';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Navebar from './components/Layout/Navebar'
import Footer from './components/Layout/Footer'
import Home from './components/Home/Home'
import Jobs from './components/Job/jobs'
import jobDetails from './components/Job/jobDetails'
import MyJobs from './components/Job/MyJobs'
import PostJob from './components/Job/PostJob'
import Application from './components/Application/Application'
import MyApplication from './components/Application/MyApplication'
import NotFound from './components/NotFound/NotFound'
import axios from "axios";
import {Toster} from "react-hot-toast";



const App = () => {

   const {isAuthorized, setIsAuthorize, setUser } = useContext(Context);

   useEffect(()=>{
        const fetchUser = async()=>{
          
        }
   }, [isAuthorized])




  return <>
      <Router>
        <Navebar />
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/' element={<Home/>}/>
          <Route path='/job/getall' element={<Jobs/>}/>
          <Route path='/job/:id' element={<jobDetails/>}/>
          <Route path='/job/post' element={<PostJob/>}/>
          <Route path='/job/me' element={<MyJobs/>}/>
          <Route path='/application/:id' element={<Application/>}/>
          <Route path='/application/me' element={<MyApplication/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
        <Footer />
        <Toster />
      </Router>
    </>
}

export default App
