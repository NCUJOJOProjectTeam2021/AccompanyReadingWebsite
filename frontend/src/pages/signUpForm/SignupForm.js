import React from 'react';
import { useGlobalState } from '../../API/RoomContextProvider';
import { useNavigate } from 'react-router-dom';
import { Device } from '@twilio/voice-sdk';


const SignupForm = () => {
    // useGlobalState return value which is props down by RoomContextProvider
    const navigate = useNavigate();
    const [state, setState] = useGlobalState();
    const updateNickname = (nickName) => {
        setState({ ...state, nickName });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const nickName = state.nickName;
        setupTwillo(nickName);
        navigate('/roomsList');
    }
    //get the access token
    const setupTwillo = (nickName) => {
        fetch(`/api/token/${nickName}`)
            .then(response => {
                console.log(response);
                return (response.json());
            })
            .then(data => {
                console.log(data.token);
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
                setState((state) => {
                    return { ...state, device, twilioToken }
                });
            }).catch((error) => {
                console.log(error);
            })
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter nickname"
                onChange={e => updateNickname(e.target.value)}
            />
            <input type="submit" value="Submit" />
        </form>
    );
};

export default SignupForm;
