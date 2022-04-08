import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalState } from '../API/RoomContextProvider';
import { useFetchRooms } from '../API/Hook';

// a room in rooms
const Room = ({ room }) => {
    const nevigate = useNavigate();
    const [state, setState] = useGlobalState();
    const [call, setCall] = useState();
    const { device, nickName } = state;
    const roomName = room.room_name;
    const fetchRooms = useFetchRooms('/api/rooms');

    useEffect(() => {
        // pass parameters to POST
        const params = {
            roomName: roomName, participantLabel: nickName
        };
        if (!call) {
            const callPromise = device.connect({ params });
            callPromise.then((call) => {
                setCall(call);
            });
        }
        if (!room.participants.includes(nickName)) {
            room.participants.push(nickName);
            console.log(nickName);
        }
    }, [device, roomName, nickName, room, call]);

    const handleLeaveRoom = () => {
        call.disconnect();
        nevigate('/rooms');
    };
    const handleEndRoom = () => {
        handleLeaveRoom();
        setState({ ...state, createdRoomTopic: null }); // clear created room.
    };
    const refreshRooms = () => {
        fetchRooms()
            .then(rooms => {
                const selectedRoom = rooms.find((room) => {
                    return room.room_name === roomName
                });
                if (selectedRoom) {
                    setState({ ...state, selectedRoom });
                }
            });
    }

    return (
        <div>
            <h1>{room.room_name}</h1>
            <p>Others in the room</p>
            <ul>
                {
                    room.participants.map((participant, index) => (
                        participant === nickName ? <li key={index}><em>{participant}</em></li> : <li key={index}>{participant}</li>
                    ))
                }
            </ul>
            <div>
                <button onClick={refreshRooms}>Refresh</button>
                <button onClick={handleLeaveRoom}>Leave Quietly</button>
                {room.participants.length === 1 ? <button onClick={handleEndRoom}>End room</button> : null}
            </div>
        </div>
    )
}

export default Room;