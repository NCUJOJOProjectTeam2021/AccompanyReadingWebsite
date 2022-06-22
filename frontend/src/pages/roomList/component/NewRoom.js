import React from 'react';
import { useGlobalState } from '../../../global/api/ContextProvider';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import getTwilioToken from '../../../global/api/getTwilioToken';
import Cookies from 'universal-cookie';



const NewRoom = () => {
    const [state, setState] = useGlobalState();
    const navigate = useNavigate();
    const cookies = new Cookies();
    const username = cookies.get('username');
    const updateRoomName = (createdRoomTopic) => {
        setState({ ...state, createdRoomTopic });
    };

    const handleRoomCreate = () => {
        if (state.createdRoomTopic === undefined) {
            return;
        } else {
            const selectedRoom = {
                room_name: state.createdRoomTopic, participants: []
            };
            const rooms = state.rooms;
            const roomId = rooms.push(selectedRoom);
            setState({ ...state, rooms });
            setState({ ...state, selectedRoom });
            getTwilioToken(username, state.createdRoomTopic);
            navigate(`/roomsList/${roomId}`);
        }
    };

    return (
        <Grid container
            direction="row"
            justifyContent="flex-end"
            alignItems="baseline">
            <Grid item xs={2}>

                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <TextField id="topic" label="Create your own room." variant="standard" onChange={e => updateRoomName(e.target.value)} />
                </Box>
            </Grid>
            <Grid item xs={2}>
                <Button onClick={handleRoomCreate} variant="contained">
                    Go
                </Button>
            </Grid>
        </Grid>
    );
};

export default NewRoom;