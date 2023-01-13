import React from "react";
import { TextField, Grid, Button } from '@mui/material';

const Lobby = ({
    username,
    handleUsernameChange,
    roomname,
    handleRoomnameChange,
    handleSubmit
}) => {
    return (
        <Grid container justifyContent="center">
            <form onSubmit={handleSubmit}>
                <h2>Enter a room</h2>
                <TextField
                    variant="outlined"
                    label="User name"
                    size="small"
                    margin="dense"
                    type="text"
                    id="field"
                    value={username}
                    onChange={handleUsernameChange}
                    required
                />
                <br />
                <TextField
                    variant="outlined"
                    label="Room name"
                    size="small"
                    margin="dense"
                    type="text"
                    id="room"
                    value={roomname}
                    onChange={handleRoomnameChange}
                    required
                />
                <br />
                <Button
                    type="submit"
                    variant="contained"
                    size="small"
                >
                    Submit
                </Button>
            </form>
        </Grid>
    );
};

export default Lobby;

