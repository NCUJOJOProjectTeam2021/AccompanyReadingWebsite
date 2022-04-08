import React, { useEffect } from 'react';
import NewRoom from './NewRoom';
import { Link } from 'react-router-dom';
import { useGlobalState } from '../API/RoomContextProvider';
import { useFetchRooms } from '../API/Hook';

const RoomList = () => {
    const [state, setState] = useGlobalState();
    const fetchRooms = useFetchRooms('/api/rooms');

    useEffect(() => {
        fetchRooms().then(rooms => {
            setState((state) => {
                return { ...state, rooms };
            });
        })
    }, [fetchRooms, setState]);

    return (
        <div>
            <h1>Available rooms</h1>

            {
                state.rooms.length > 0 ?
                    <ul>
                        {state.rooms.map((selectedRoom, index) => (
                            <li key={index + 1}>
                                <Link to={`/rooms/${index + 1}`} onClick={() => { setState({ ...state, selectedRoom: selectedRoom }) }}>{selectedRoom.room_name}</Link>
                            </li>
                        ))}
                    </ul> :
                    <div>Create a new room to get started</div>
            }
            <NewRoom />
        </div>
    );
};

export default React.memo(RoomList);