import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import Axios from '../../../global/api/Axios'
import { useNavigate } from "react-router-dom";





export default function PostForum() {
    const [author, setAuthor] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    function authorOnchange(e) {
        setAuthor(e.target.value);
    }
    function titleOnchange(e) {
        setTitle(e.target.value);
    }
    function contentOnchange(e) {
        setContent(e.target.value);
    }


    async function submitForm() {
        const form = {
            "Post_author": author,
            "Post_title": title,
            "Post_content": content
        }
        try {
            await Axios.post("/api/forum/", form);
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
                position: "relative ", top: 8,
            }}
        >   <h1 style={{ fontFamily: "Sans-Serif" }} >
                Post
            </h1>

            <h3 >
                author
            </h3>
            <TextField label={'author'} id="Post_author" value={author} onChange={authorOnchange} />
            <h3 >
                title
            </h3>
            <TextField label={'title'} id="Post_title" value={title} onChange={titleOnchange} margin="dense" />
            <h3 >
                content
            </h3>
            <TextField label={'content'} id="Post_content" value={content} onChange={contentOnchange} margin="normal" />


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
