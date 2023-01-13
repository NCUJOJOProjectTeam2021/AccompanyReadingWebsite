import React, { useState, useEffect, useCallback } from 'react';
import Video from 'twilio-video';
import Participant from './Participant';
import { Button, Grid, Typography } from '@mui/material';
import { createScreenTrack } from '../screenshare/scripts/CreateScreenTrack';

const Room = ({ roomname, token, handleLeave }) => {
    const [room, setRoom] = useState(null);
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        const participantConnected = participant => {
            setParticipants(prevParticipants => [...prevParticipants, participant]);
        };
        const participantDisconnected = participant => {
            setParticipants(prevParticipants =>
                prevParticipants.filter(p => p !== participant)
            );
        };
        Video.connect(token, {
            name: roomname
        }).then(room => {
            setRoom(room);
            room.on('participantConnected', participantConnected);
            room.on('participantDisconnected', participantDisconnected);
            room.participants.forEach(participantConnected);
        });

        return () => {
            setRoom(currentRoom => {
                if (currentRoom && currentRoom.localParticipant.state === 'connected') {
                    currentRoom.localParticipant.tracks.forEach(function (trackPublication) {
                        trackPublication.track.stop();
                    });
                    currentRoom.disconnect();
                    return null;
                }
                else {
                    return currentRoom;
                }
            })
        };
    }, [roomname, token]);

    const handleScreenShare = useCallback(async event => {
        event.preventDefault();
        const track = await createScreenTrack(360, 640);
        console.log('screen track status:');
        console.log(track);
        room.localParticipant.publishTrack(track);
    });

    const remoteParticipants = participants.map(participant => (
        <Participant key={participant.sid} participant={participant} />
    ));

    return (
        <div className='room'>
            <Typography variant="h3" color="inherit" component="div">
                {roomname}
            </Typography>
            <Button onClick={handleLeave} variant="contained" color="error">Leave</Button>
            <Button onClick={handleScreenShare} variant="outlined">Share Screen</Button>
            <div className='local-participant'>
                {room ? (
                    <Participant
                        key={room.localParticipant.sid}
                        participant={room.localParticipant}
                    />
                ) : (
                    ''
                )}
            </div>
            <h3>Remote Paritcipants</h3>
            <Grid container className='remote-participants'>{remoteParticipants}</Grid>
        </div>
    );
};

export default Room;