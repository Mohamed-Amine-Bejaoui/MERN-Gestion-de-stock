// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar'; 
import Login from './components/login';   
import Signup from './components/signup'; 
import Home from './components/home'; 
import Sidebar from './components/Sidebar'; 


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />


      </Routes>
    </Router>
  );
}

export default App;
