import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './pages/home/app';
import SignIn from './pages/signin/app';
import SignUp from './pages/signup/app';
import './index.css';
import Forum from './pages/forum'
import CreatePost from './pages/createPostPage'
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import PostPage from './pages/postPage';
import AddThread from './pages/addThread'
import { ThemeProvider } from '@material-ui/core'
import { theme } from './global/api/theme'



ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Router>
      <Routes>
        <Route path="/forum" element={<Forum />} exact />
        <Route path="/forum/:id" element={<PostPage />} />
        <Route path="/forum/:id/add-comment" element={<AddThread />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
