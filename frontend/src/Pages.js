import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import RoomList from './pages/roomList';
import Room from './pages/room/Room';
import { useGlobalState } from './global/api/ContextProvider'
import SignIn from './pages/signin/app';
import SignUp from './pages/signup/app';
import './index.css';
import Forum from './pages/forum'
import CreatePost from './pages/createPostPage'
import PostPage from './pages/postPage';
import AddThread from './pages/addThread'
import WhiteBoardHTML from './pages/whiteBoard/component/WhiteBoardHTML';
import Page404 from './pages/page404';
import { getCookie } from './global/api/cookie';
import ProtectedRoute from './global/component/ProtectedRoute'



const Pages = () => {
    const [state, setState] = useGlobalState();
    const room = state.selectedRoom;
    const [login, setLogin] = useState(false);
    return (
        <Router>
            {/* change the protect way to a pretty way */}
            <Routes>
                {/* roomList */}
                <Route path='/roomsList' element={state.twilioToken ? <ProtectedRoute><RoomList /></ProtectedRoute> : <Navigate to={"/forum"} />} />
                <Route path={'/roomsList/:roomId/whiteboard'} element={<ProtectedRoute><WhiteBoardHTML /></ProtectedRoute>} />
                <Route path={'/roomsList/:roomId'} element={room ? <ProtectedRoute><Room room={room} /> </ProtectedRoute> : <Navigate to={"/404"} />} />

                {/* forum */}
                <Route path="/forum/:id/comment" element={<ProtectedRoute><AddThread /></ProtectedRoute>} />
                < Route path="/forum/:id" element={<ProtectedRoute><PostPage /></ProtectedRoute>} />
                <Route path="/forum/create" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
                <Route path="/forum" element={<ProtectedRoute><Forum /></ProtectedRoute>} />

                {/* other */}
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/404" element={<Page404 />} />
                <Route path="/" element={<Navigate replace to="/signin" />} />
                <Route path="*" element={<Navigate replace to="/404" />} />
            </Routes>
        </Router>
    );
}

export default Pages;