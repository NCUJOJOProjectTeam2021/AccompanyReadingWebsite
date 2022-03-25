import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Forum from './pages/forum'
import CreatePost from './pages/createPostPage'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Thread from './pages/thread';



ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/forum" element={<Forum />} exact />
      <Route path="/forum/:id" element={<Thread />} />
      <Route path="/create-post" element={<CreatePost />} />

    </Routes>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
