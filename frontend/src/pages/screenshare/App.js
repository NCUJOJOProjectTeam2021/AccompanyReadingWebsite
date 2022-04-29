import { useEffect, useState } from 'react';
import { connect } from 'twilio-video';
import { getUsername, refresh } from '../../auth';
import { createScreenTrack } from './scripts/CreateScreenTrack';
import { getRoomCredentials } from './scripts/GetRoomCredential';
import './style.css'

const ScreenSharing = () => {
    const [screenTrack, setScreenTrack] = useState('');
    const [token, setToken] = useState('');
    const [room, setRoom] = useState(null);

    //get token
    const getToken = async () => {
        const username = await getUsername();
        const json = await getRoomCredentials(username);
        const data = JSON.parse(json);
        setToken(data.token);
    };

    useEffect(() => {
        refresh();
        if (!token) {
            getToken();
        }
    });

    //set room
    const getRoom = async () => {
        const room = await connect(token, {
            tracks: []
        });
        console.log(`successfully joined a room: ${room}`);
        const localParticipant = room.localParticipant;
        console.log(`connect to the room as localparticipant ${localParticipant.identity}`);

        room.once('participantConnected', participant => {
            console.log(`a remote participant connected: ${participant.identity}`);
        });
        room.once('participantDisconnected', participant => {
            console.log(`a remote participant disconnect: ${participant.identity}`);
        });
        setRoom(room);
    }

    useEffect(() => {
        if (token) {
            getRoom();
        }
    }, [token]);

    //subscribe already in room video
    useEffect(() => {
        if (room) {
            room.participants.forEach(participant => {
                participant.tracks.forEach(publication => {
                    if (publication.track) {
                        document.getElementById('remoteshare').appendChild(publication.track.attach());
                    }
                });

                participant.on('trackSubscribed', track => {
                    document.getElementById('remoteshare').appendChild(track.attach());
                });
            });
        }
    }, [room])

    //hang the status to someone publish the track


    //attach the screen and publish
    useEffect(() => {
        if (screenTrack) {
            try {
                const screenPreview = document.getElementById('screenpreview');
                screenTrack.attach(screenPreview);
                room.localParticipant.publishTrack(screenTrack);
                console.log('publish the track successfully');
            } catch (e) {
                console.log(e.message);
            }
        }
    }, [screenTrack]);


    //handle button
    const handleCapture = async () => {
        try {
            setScreenTrack(await createScreenTrack(720, 1280));
        } catch (e) {
            alert(e.message);
        }
    };

    const handleStop = () => {
        screenTrack.stop();
        room.localParticipant.unpublishTrack(screenTrack);
        setScreenTrack(null);
    }

    const handleDisconnect = () => {
        if (room) {
            if (screenTrack) {
                handleStop();
            }
            room.disconnect();
            setRoom(null);
            console.log('disconnected');
        }
    }


    refresh();
    return (
        <div>
            <div>
                <video className="screen" id="screenpreview" autoPlay />
                <button id="capture" onClick={handleCapture}>start capture</button>
                <button id="stopcapture" onClick={handleStop}>stop capture</button>
                <button id="disconnect" onClick={handleDisconnect}>disconnect</button>
            </div>
            <div id="remoteshare"></div>
        </div>
    );
};

export { ScreenSharing };