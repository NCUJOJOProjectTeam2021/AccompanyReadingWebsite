import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RoomList from './pages/roomList';
import Room from './pages/room/Room';
import SignupForm from './pages/signUpForm/SignupForm'
import { useGlobalState, RoomContextProvider } from './API/RoomContextProvider'

const Pages = () => {
    const [state, setState] = useGlobalState();
    const room = state.selectedRoom;

    return (
        <Router>
            <Routes>
                <Route path={'/rooms/:roomId'} element={room ? <Room room={room} /> : null} />

                <Route path='/rooms' element={state.twilioToken ? <RoomList /> : <SignupForm />} />

                <Route path='/' element={<SignupForm />} />

            </Routes>
        </Router>
    );
}

export default Pages;