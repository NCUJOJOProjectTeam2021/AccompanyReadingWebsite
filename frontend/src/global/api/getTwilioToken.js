
import { useGlobalState } from '../../global/api/ContextProvider';
import { Device } from '@twilio/voice-sdk';
import { getUsername, refreshToken } from '../api/getToken'
import Cookies from 'universal-cookie';
import { useEffect } from 'react';


export default function getTwilioToken(username) {
    const cookies = new Cookies();

    const setupTwillo = (username) => {
        fetch(`/api/token/${username}`)
            .then(response => {
                return (response.json());
            })
            .then(data => {
                const twilioToken = data.token;
                const device = new Device(twilioToken);
                device.updateOptions(twilioToken, {
                    codecPreferences: ['opus', 'pcmu'],
                    fakeLocalDTMF: true,
                    maxAverageBitrate: 16000
                });
                device.on('error', (device) => {
                    console.log("error: ", device);
                });
                // setState((state) => {
                //     console.log(twilioToken);
                //     return { ...state, device, twilioToken }
                // });
                cookies.set('twilioToken', twilioToken);
            }).catch((error) => {
                console.log(error);
            })
    }
    setupTwillo(username);
    //get the access token
}