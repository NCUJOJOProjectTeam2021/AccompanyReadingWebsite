import React, { useEffect, useState } from 'react';
import NewRoom from './component/NewRoom';
import { useGlobalState } from '../../global/api/ContextProvider';
import { useFetchRooms } from '../../global/api/Hook';

import { refreshToken } from '../../global/api/getToken';
// material
import { styled, Stack, Paper, Container, Box, Grid, Typography } from '@mui/material';
// components
import Page from '../../../global/component/Page';
import RoomCard from './component/BlogPostCard';



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
    var rooms;
    // const { twilioToken, username } = state;



    useEffect(() => {
        rooms = fetchRooms().then(rooms => {
            setState((state) => {
                return { ...state, rooms };
            });
            return rooms;
        })
        console.log(rooms);
    }, [fetchRooms, setState]);
    return (
        <Page title="Blog">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Discussion room
                    </Typography>
                </Stack>

                <Grid container spacing={3}>
                    {rooms.map((room, index) => (
                        <RoomCard key={index + 1} room={room} index={index} />
                    ))}
                </Grid>
            </Container>
        </Page>
    )
};