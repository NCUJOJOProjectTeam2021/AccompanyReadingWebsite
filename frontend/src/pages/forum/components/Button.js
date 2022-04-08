import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { PostAdd } from '@mui/icons-material';

// const Input = styled('input')({
//     display: 'none',
// });

export default function Buttons() {
    const navigate = useNavigate();
    function handlePost(e) {
        navigate("/create-post");
    }
    return (
        <Button onClick={handlePost} variant="contained" size="large" sx={{ position: "relative", left: "47.5%", top: "30px" }}>
            <PostAdd />
            Post
        </Button>
    );
}