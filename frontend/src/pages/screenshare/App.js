import { useEffect, useState } from 'react';
import { connect } from 'twilio-video';
import { getUsername, refresh } from '../../auth';
import { createScreenTrack } from './scripts/CreateScreenTrack';
import { getRoomCredentials } from './scripts/GetRoomCredential';
import './style.css'

const ScreenSharing = () => {
    var screenTrack;
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
        setRoom(room);
    }

    useEffect(() => {
        if (token) {
            getRoom();
        }
    }, [token]);

    //subscribe already in room video

    //hang the status to someone pushlish the track


    //handle button
    const handlecapture = async () => {
        const screenPreview = document.getElementById('screenpreview');

        try {
            screenTrack = await createScreenTrack(720, 1280);
            screenTrack.attach(screenPreview);
            alert(room.name);
        } catch (e) {
            alert(e.message);
        }
    };

    const handlestop = async () => {
        screenTrack.stop();
    }


    refresh();
    return (
        <div>
            <div>
                <video className="screen" id="screenpreview" autoPlay />
                <button id="capture" onClick={handlecapture}>start capture</button>
                <button id="stopcapture" onClick={handlestop}>stop capture</button>
            </div>
            <div id="remoteshare"></div>
        </div>
    );
};

export { ScreenSharing };