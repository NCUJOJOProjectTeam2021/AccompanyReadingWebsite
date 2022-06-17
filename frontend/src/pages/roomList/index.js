import React, { useEffect } from 'react';
import NewRoom from './component/NewRoom';
import { Link } from 'react-router-dom';
import { useGlobalState } from '../../global/api/ContextProvider';
import { useFetchRooms } from '../../global/api/Hook';
import { styled, Stack, Paper, Grid, Box } from '@mui/material';
import { getUsername, refreshToken } from '../../global/api/getToken';



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(12),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: "10%",
    borderRadius: "5%",
    height: "70vh",
}));
const SubItem = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const RoomList = () => {
    const [state, setState] = useGlobalState();
    const fetchRooms = useFetchRooms('/api/rooms');
    // const { twilioToken, username } = state;



    useEffect(() => {
        fetchRooms().then(rooms => {
            setState((state) => {
                return { ...state, rooms };
            });
        })
        refreshToken();
    }, [fetchRooms, setState]);

    return (
        <Box
            sx={{
                width: "100vw",
                height: "100vh",
                backgroundColor: 'primary.dark',
                margin: "0px",
            }}>

            <Grid container spacing={2} >
                <Grid item xs={6} >
                    <Item >
                        <Stack spacing={2}>
                            <h1>Available rooms...</h1>

                            {(state.rooms.length > 0) ?
                                state.rooms.map((selectedRoom, index) => (

                                    <SubItem key={index + 1}>
                                        <Link to={`/roomsList/${index + 1}`} onClick={() => { setState({ ...state, selectedRoom }) }}>{selectedRoom.room_name}</Link>
                                    </SubItem>
                                ))

                                :
                                < h3 > No room available now ...<br />
                                    Create a new room to get started</h3>

                            }
                        </Stack>
                    </Item>
                </Grid>
                <Grid item xs={6} >
                    <Item>
                        <Stack spacing={10}>
                            <h2>Enter a room topic to start a new room ...</h2>
                            <NewRoom />
                            <Link to={"/forum"} variant="body2">
                                {"Back to forum"}
                            </Link>
                        </Stack>
                    </Item>
                </Grid>
            </Grid>
        </Box >
    );
};

export default React.memo(RoomList);