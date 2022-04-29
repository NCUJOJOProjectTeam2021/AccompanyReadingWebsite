import React, { useState, useEffect } from 'react';
import { Box, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import Axios from '../../../global/api/Axios'
import { useNavigate, useLocation } from "react-router-dom";
import { getUsername, refreshToken } from '../../home/app';


export default function Comment(props) {
    const location = useLocation();
    const [username, setUsername] = useState();
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    const forumID = location.state;
    const [loading, setLoading] = useState(false);

    function contentOnchange(e) {
        setContent(e.target.value);
    }
    useEffect(() => {
        getUsername().then((res) => {
            refreshToken();
        })
        getUsername().then((res) => res.json())
            .then((res) => setUsername(res.user));
    }, [])

    async function submitThread() {
        const thread = {
            "reply_user": username,
            "reply_content": content,
            "reply_post": forumID
        }
        try {
            await Axios.post("/api/forum/thread/", thread);
        } catch (err) {
            console.log(err);
        }
    }
    function handleSubmit(e) {
        submitThread();
        setLoading(true);
        //await data to post (may change)
        setTimeout(() => {
            navigate(`/forum/${forumID}`, { state: forumID });
        }, 3000);
    }

    return (
        <Box
            alignItems="center"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                '& .MuiTextField-root': { width: '60ch' },
                position: "relative ", top: 8,
            }}
        >   <h1 style={{ fontFamily: "Sans-Serif" }} >
                Comment
            </h1>

            <h3 >
                content
            </h3>
            <TextField label={'content'} id="reply_content" value={content} onChange={contentOnchange} margin="normal" />


            <LoadingButton
                color="secondary"
                onClick={handleSubmit}
                loading={loading}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="contained"
                size="large"
                sx={{
                    top: "10px"
                }}
            >
                Save
            </LoadingButton>

        </Box>

    );
}
