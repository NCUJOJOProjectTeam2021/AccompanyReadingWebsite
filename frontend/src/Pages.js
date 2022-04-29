import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import RoomList from './pages/roomList';
import Room from './pages/room/Room';
import { useGlobalState } from './API/RoomContextProvider'
import HomePage from './pages/home/app';
import SignIn from './pages/signin/app';
import SignUp from './pages/signup/app';
import './index.css';
import Forum from './pages/forum'
import CreatePost from './pages/createPostPage'
import PostPage from './pages/postPage';
import AddThread from './pages/addThread'
import { ScreenSharing } from './pages/screenshare/App';




const Pages = () => {
    const [state, setState] = useGlobalState();
    const room = state.selectedRoom;

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate replace to="/home" />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path={'/roomsList/:roomId'} element={room ? <Room room={room} /> : null} />

                <Route path='/screenshare' element={<ScreenSharing />} />

                <Route path='/roomsList' element={state.twilioToken ? <RoomList /> : <Navigate to={"/forum"} />} />
                <Route path="/forum" element={<Forum />} />
                <Route path="/forum/:id" element={<PostPage />} />
                <Route path="/forum/:id/add-comment" element={<AddThread />} />
                <Route path="/create-post" element={<CreatePost />} />
            </Routes>
        </Router>
    );
}

export default Pages;