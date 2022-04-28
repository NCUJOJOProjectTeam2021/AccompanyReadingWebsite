import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalState } from '../../API/RoomContextProvider';
import { useFetchRooms } from '../../API/Hook';
import { styled, Stack, Paper, Grid, Box, Button, ButtonGroup } from '@mui/material';
import { getUsername, refreshToken } from '../home/app';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import RefreshIcon from '@mui/icons-material/Refresh';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CloseIcon from '@mui/icons-material/Close';

// a room in rooms
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: '20px',
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: "5%",
    height: "70vh",
}));

const ScreenContainer = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#87CEFA',
    ...theme.typography.body2,
    padding: '20px',
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: "5%",
    height: "70vh",
}));

const Screen = styled(Paper)(() => ({
    backgroundColor: '#1A2027',
    height: "75%",
    width: "100%"
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
        getUsername().then((res) => {
            if (res.status === 401) {
                refreshToken();
                console.log("aa");
            }
            // setUsername(res.json());
        });
    }, [device, roomName, nickName, room, call]);

    const handleLeaveRoom = () => {
        call.disconnect();
        nevigate('/roomsList');
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
                height: "98vh",
                backgroundColor: 'primary.dark',
                margin: "0px",
                p: "0px"
            }}>
            <Stack
                spacing={0}
                sx={{ fontWeight: 'bold', fontSize: '85px', fontFamily: 'Calibri', color: 'white', alignItems: 'flex-start', height: '10%', margin: "0px 2%" }}
            >
                {room.room_name}
            </Stack>
            <Grid container spacing={2} p="0px 3%" >
                <Grid item xs={4} >
                    <Item >
                        <Stack spacing={0} sx={{ fontWeight: 'bold', m: 0, fontSize: '30px', fontFamily: 'Calibri', alignItems: 'flex-start', height: '90%' }}>
                            <ul>
                                {
                                    room.participants.map((participant, index) => (
                                        participant === nickName ? <li key={index}><em>{participant}</em></li> : <li key={index}>{participant}</li>
                                    ))
                                }
                            </ul>
                        </Stack>

                        <Box sx={{ '& button': { m: 1 } }}>

                            <Button size="small" variant="contained" title="Screen Share"><ScreenShareIcon /></Button>


                            <Button size="small" variant="contained" title="Refresh" onClick={refreshRooms}><RefreshIcon /></Button>


                            <Button size="small" variant="contained" title="Leave Room" onClick={handleLeaveRoom}><ExitToAppIcon /></Button>

                            {room.participants.length === 1 ? <Button size="small" variant="contained" title="End Room" onClick={handleEndRoom}><CloseIcon /></Button> : null}

                        </Box>

                    </Item>
                </Grid>

                <Grid item xs={8} >
                    <ScreenContainer>
                        <Stack sx={{ height: '90%' }} justifyContent="center" alignItems="center">
                            <Screen></Screen>
                        </Stack>
                        <Stack alignItems="flex-end">
                            <Box padding="0 3%">
                                <Button variant="contained">Whiteboard</Button>
                            </Box>
                        </Stack>
                    </ScreenContainer>
                </Grid>
            </Grid>
        </Box >



    )
}

export default Room;