import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './pages/home/app';
import SignIn from './pages/signin/app';
import SignUp from './pages/signup/app';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';



ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Navigate replace to="/home" />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);

