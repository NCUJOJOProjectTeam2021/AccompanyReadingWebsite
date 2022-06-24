import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalState } from '../../global/api/ContextProvider';
import { useFetchRooms } from '../../global/api/Hook';
import { styled, Stack, Paper, Grid, Box, Button, Typography } from '@mui/material';
import { refreshToken } from '../../global/api/getToken';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import RefreshIcon from '@mui/icons-material/Refresh';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CloseIcon from '@mui/icons-material/Close';
import Cookies from 'universal-cookie';
import { Device } from '@twilio/voice-sdk';
import ReactRoundedImage from "react-rounded-image";
import MyPhoto from "./avatar.svg";
import {ScreenSharing} from '../screenshare/App'

// a room in rooms
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: '20px',
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: "5%",
    height: "65vh",
}));

const Member = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: '15px',
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: "5%",
    height: "15vh",
    width: "10vh",
}));

const ScreenContainer = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: '20px',
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: "5%",
    height: "65vh",
}));

const Screen = styled(Paper)(() => ({
    backgroundColor: '#1A2027',
    height: "75%",
    width: "80%"
}));




const Room = ({ room }) => {
    const cookies = new Cookies();
    const nevigate = useNavigate();
    const [state, setState] = useGlobalState();
    const [call, setCall] = useState();
    const twilioToken = cookies.get('twilioToken');
    const username = cookies.get("username");
    const roomName = room.room_name;
    const fetchRooms = useFetchRooms('/api/rooms');


    function twilio() {
        const device = new Device(twilioToken);
        device.updateOptions(twilioToken, {
            codecPreferences: ['opus', 'pcmu'],
            fakeLocalDTMF: true,
            maxAverageBitrate: 16000
        });
        device.on('error', (device) => {
            console.log("error: ", device);
        });
        const params = {
            roomName: roomName, participantLabel: username
        };
        if (!call) {
            const callPromise = device.connect({ params });
            callPromise.then((call) => {
                setCall(call);
            });
        }
        if (!room.participants.includes(username)) {
            room.participants.push(username);
        }
    }

    useEffect(() => {
        // pass parameters to POST 
        twilio();
    }, [roomName, username, room, call]);

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
    const handleWhiteboard = () => {
        // nevigate(`/roomsList/${roomName}/whiteboard`);
        window.open(`/roomsList/${roomName}/whiteboard`, 'width=600,height=400,left=200,top=200');
    }

    return (
        <Box
            sx={{
                width: "99vw",
                height: "98vh",
                backgroundColor: '87CEFA',
                margin: "0px",
                p: "0px"
            }}>
            <Stack
                spacing={0}
                sx={{ fontWeight: 'bold', fontSize: '75px', fontFamily: 'Calibri', color: 'black', alignItems: 'flex-start', height: '10%', margin: "0px 2%" }}
            >
                {room.room_name}
            </Stack>
            <Grid container spacing={2} p="0px 3%" >
                <Grid item xs={4} >

                    <Stack spacing={0} sx={{ fontWeight: 'bold', m: 0, fontSize: '30px', fontFamily: 'Calibri', alignItems: 'flex-start', height: '90%' }}>
                        <Grid container spacing={25} sx={{ p: '10px 0px' }} >
                            {
                                room.participants.map((participant, index) => (
                                    participant === username ?
                                        <Grid item xs={3}>
                                            <Member>
                                                <Stack sx={{ alignItems: 'center', height: '50%' }}>
                                                    <ReactRoundedImage
                                                        image={MyPhoto}
                                                        imageWidth="100"
                                                        imageHeight="100"
                                                        roundedSize="1"
                                                        borderRadius="50%"
                                                    />
                                                    <Typography variant="body1" sx={{ fontWeight: 'bold', fontFamily: 'Calibri', alignItems: 'center' }}>
                                                        <em>{participant}</em>
                                                    </Typography>
                                                </Stack>
                                            </Member>
                                        </Grid>
                                        :
                                        <Grid item xs={3}>
                                            <Member>
                                                <Stack sx={{ alignItems: 'center', height: '50%' }}>
                                                    <ReactRoundedImage
                                                        image={MyPhoto}
                                                        imageWidth="100"
                                                        imageHeight="100"
                                                        roundedSize="1"
                                                        borderRadius="50%"
                                                    />
                                                    <Typography variant="body1" sx={{ fontWeight: 'bold', fontFamily: 'Calibri', alignItems: 'center' }}>
                                                        {participant}
                                                    </Typography>
                                                </Stack>
                                            </Member>
                                        </Grid>
                                ))
                            }
                        </Grid>
                    </Stack>
                </Grid>

                <Grid item xs={6} >
                    <ScreenContainer>
                        <Stack sx={{ height: '90%' }} justifyContent="flex-start" alignItems="flex-start">
                            {/* <Screen></Screen> */}
                            <ScreenSharing/>
                        </Stack>
                        <Stack alignItems="flex-start" width="50vw">
                            <Grid container spacing={0} >
                                <Grid p="0px 10px">
                                    <Button size="small" variant="contained" title="Screen Share"><ScreenShareIcon /></Button>
                                </Grid>
                                <Grid p="0px 10px">
                                    <Button size="small" variant="contained" title="Refresh" onClick={refreshRooms}><RefreshIcon /></Button>
                                </Grid>
                                <Grid p="0px 10px">
                                    {room.participants.length === 1 ?
                                        <Button size="small" variant="contained" title="End Room" onClick={handleEndRoom}><CloseIcon /></Button> :
                                        <Button size="small" variant="contained" title="Leave Room" onClick={handleLeaveRoom}><ExitToAppIcon /></Button>}
                                </Grid>
                                <Grid p="0px 10px">
                                    <Button onClick={handleWhiteboard} variant="contained">Whiteboard</Button>
                                </Grid>
                            </Grid>
                        </Stack>
                    </ScreenContainer>
                </Grid>
            </Grid >
        </Box >



    )
}

export default Room;