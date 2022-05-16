import React, { useEffect, useState } from 'react';
import { Box, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import Axios from '../../../global/api/Axios'
import { useNavigate } from "react-router-dom";
import { getUsername, refreshToken } from '../../home/app';
import { useGlobalState } from '../../../global/api/ContextProvider';


export default function PostForum() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [state] = useGlobalState();
    const { username } = state;
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        refreshToken();
    }, [])

    function titleOnchange(e) {
        setTitle(e.target.value);
    }
    function contentOnchange(e) {
        setContent(e.target.value);
    }


    async function submitForm() {
        const form = {
            "Post_author": username,
            "Post_title": title,
            "Post_content": content
        }
        try {
            await Axios.post("/api/forum/forum/", form);
        } catch (err) {
            console.log(err);
        }
    }
    function handleSubmit(e) {
        submitForm();
        setLoading(true);
        //await data to post (may change)
        setTimeout(() => {
            navigate('/forum');
        }, 3000);

    }
    return (
        <Box
            alignItems="center"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                '& .MuiTextField-root': { width: '60ch' },
                position: "relative", top: 8,
            }}
        >   <h1 style={{ fontFamily: "Segoe UI" }} >
                Post
            </h1>

            <h3 >
                title
            </h3>
            <TextField label={'title'} id="Post_title" value={title} onChange={titleOnchange} margin="dense" />
            <h3 >
                content
            </h3>
            <TextField label={'content'} id="Post_content" value={content} onChange={contentOnchange} margin="normal" />


            <LoadingButton
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                loading={loading}
                loadingPosition="start"
                startIcon={<SaveIcon />}
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
