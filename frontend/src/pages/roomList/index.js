import React, { useEffect, useState } from 'react';
import NewRoom from './component/NewRoom';
import { useGlobalState } from '../../global/api/ContextProvider';
import { useFetchRooms } from '../../global/api/Hook';
// material
import { styled, Stack, Paper, Container, Box, Grid, Typography } from '@mui/material';
// components
import Page from '../../global/component/Page';
import RoomCard from './component/RoomCard';



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
    const [rooms, setRooms] = useState([])
    // const { twilioToken, username } = state;



    useEffect(() => {
        fetchRooms().then(rooms => {
            setState((state) => {
                return { ...state, rooms };
            });
            setRooms(rooms);
        })
        console.log(rooms.length);
    }, [fetchRooms, setState]);
    return (
        <Page title="Room">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Discussion room
                    </Typography>
                </Stack>

                <Grid container spacing={3}>
                    {
                        rooms.length > 0 ?
                            rooms.map((selectedRoom, index) => (
                                <RoomCard key={index + 1} selectedRoom={selectedRoom} index={index} />
                            )) : <NewRoom />
                    }
                </Grid>
            </Container>
        </Page>
    )
};
export default RoomList;