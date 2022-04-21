import React from 'react';
import { useGlobalState } from '../API/RoomContextProvider';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';



const NewRoom = () => {
    const [state, setState] = useGlobalState();
    const navigate = useNavigate();
    const updateRoomName = (createdRoomTopic) => {
        setState({ ...state, createdRoomTopic });
    };

    const handleRoomCreate = () => {
        const selectedRoom = {
            room_name: state.createdRoomTopic, participants: []
        };
        const rooms = state.rooms;
        const roomId = rooms.push(selectedRoom);
        setState({ ...state, rooms });
        setState({ ...state, selectedRoom });
        navigate(`/rooms/${roomId}`);
    };

    return (
        <div>
            <Stack direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}>

                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <TextField id="topic" label="Enter a room topic." variant="standard" onChange={e => updateRoomName(e.target.value)} />
                </Box>

                <Button onClick={handleRoomCreate} variant="contained">
                    Start room
                </Button>
            </Stack>
        </div>
    );
};

export default NewRoom;