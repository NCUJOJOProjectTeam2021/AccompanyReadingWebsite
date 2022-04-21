import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalState } from '../API/RoomContextProvider';
import { useFetchRooms } from '../API/Hook';
import { styled, Stack, Paper, Grid, Box, Button, ButtonGroup } from '@mui/material';
import Typography from '@mui/material/Typography';

// a room in rooms
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(12),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: "5%",
    height: "55vh",
}));

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
        <Box
            sx={{
                width: "99vw",
                height: "99vh",
                backgroundColor: 'primary.dark',
                margin: "0px",
            }}>
            <Grid container spacing={2} sx={{ p: 10 }} >
                <Grid item xs={4} >
                    <Item sx={{ display: 'block' }} >
                        <Stack spacing={5}>
                            <ul>
                                {
                                    room.participants.map((participant, index) => (
                                        participant === nickName ? <li key={index}><em>{participant}</em></li> : <li key={index}>{participant}</li>
                                    ))
                                }
                            </ul>
                        </Stack>

                        <Stack
                            direction="row"
                            justifyContent="center"
                            alignItems="flex-end"
                            spacing={2}
                        >
                            <div>
                                <Typography component="div">
                                    <Box sx={{ fontWeight: 'bold', m: 0 }}>
                                        {room.room_name}
                                    </Box>
                                </Typography>

                                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                    <Button onClick={refreshRooms}>Refresh</Button>
                                    <Button onClick={handleLeaveRoom}>Leave Quietly</Button>
                                    {room.participants.length === 1 ? <Button onClick={handleEndRoom}>End room</Button> : null}
                                </ButtonGroup>
                            </div>
                        </Stack>
                    </Item>
                </Grid>

                <Grid item xs={8} >
                    <Item>
                        <div>
                            <button onClick={refreshRooms}>Refresh</button>
                            <button onClick={handleLeaveRoom}>Leave Quietly</button>
                            {room.participants.length === 1 ? <button onClick={handleEndRoom}>End room</button> : null}
                        </div>
                    </Item>
                </Grid>
            </Grid>
        </Box >



    )
}

export default Room;