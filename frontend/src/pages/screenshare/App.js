import { useState } from 'react';
import { createScreenTrack } from './scripts/CreateScreenTrack';
import './style.css'

const ScreenSharing = () => {
    var screenTrack;
    const [token, setToken] = useState('');

    //get token

    //set room

    //subscribe already in room video

    //hang the status to someone pushlish the track


    //handle button
    const handlecapture = async () => {
        const screenPreview = document.getElementById('screenpreview');

        try {
            screenTrack = await createScreenTrack(720, 1280);
            screenTrack.attach(screenPreview);
        } catch (e) {
            alert(e.message);
        }
    };

    const handlestop = async () => {
        screenTrack.stop();
    }

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