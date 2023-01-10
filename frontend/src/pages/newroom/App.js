import React, { useCallback, useState } from "react";
import Lobby from "./Lobby";
import Room from "./Room";


const VideoChat = () => {
    const [username, setUsername] = useState('');
    const [roomname, setRoomname] = useState('');
    const [token, setToken] = useState(null);

    const handleUsernameChange = useCallback(event => {
        setUsername(event.target.value);
    }, []);

    const handleRoomnameChange = useCallback(event => {
        setRoomname(event.target.value);
    }, []);

    const handleSubmit = useCallback(async event => {
        event.preventDefault();
        const data = await fetch('api/video/token', {
            method: 'Post',
            body: JSON.stringify({
                username: username,
                roomname: roomname
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json());
        setToken(data.token);
    }, [username, roomname]);

    const handleLeave = useCallback(event => {
        setToken(null);
    }, [])

    let render;
    if (token) {
        render = (
            <Room roomname={roomname} token={token} handleLeave={handleLeave} />
        );
    }
    else {
        render = (
            < Lobby
                username={username}
                roomname={roomname}
                handleUsernameChange={handleUsernameChange}
                handleRoomnameChange={handleRoomnameChange}
                handleSubmit={handleSubmit}
            />
        );
    }

    return render;
};

export default VideoChat;