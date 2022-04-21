import React, { useEffect, useState } from 'react'
import { Avatar, ListItemAvatar, Button, Typography, ListItem, ListItemText, Divider, Grid, Box } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import axios from "../../../global/api/Axios";
import { useNavigate, useLocation } from "react-router-dom";



export default function PostDetail(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const forumID = location.state;
    const [data, setData] = useState([]);
    const [thread, setThread] = useState([]);

    async function fetchData() {
        try {
            const response = await axios.get(`api/forum/${forumID}/`);
            let data = await response.data;
            console.log(data);
            setData(data);
            setThread(data.threads);

        } catch (err) {
            console.log(err);
        }
    }

    function handleAddComment(postID) {
        navigate(`/forum/${postID}/add-comment`, { state: postID });
    }

    const renderItems = thread.map((data, index) => {
        return (
            <div key={index}>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        {/* photo */}
                        <Avatar sx={{ bgcolor: 'text.primary' }} >
                            <AccountCircle />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline', fontWeight: 'bold' }}
                                    component="div"
                                    variant="h6"
                                    color="rgba(1,13,133,1)"
                                >
                                    {data.reply_user}
                                </Typography>
                            </React.Fragment>
                        }
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="subtitle1"
                                    color="rgba(128,128,128,1)"
                                >
                                    {data.reply_content}
                                </Typography>
                            </React.Fragment>
                        }
                    />
                </ListItem>
            </div >
        )
    })
    useEffect(() => {
        fetchData();
    }, [])

    return (
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <ListItem sx={{ top: 30 }} >
                <ListItemAvatar >
                    <Avatar sx={{ bgcolor: 'text.primary' }} >
                        <AccountCircle />
                    </Avatar>
                </ListItemAvatar>
                <Typography
                    sx={{ display: 'inline', fontWeight: 'bold', top: 10 }}
                    component="div"
                    variant="h6"
                    color="rgba(1,13,133,1)"
                >
                    {data.Post_author}
                </Typography>

            </ListItem>
            <ListItem sx={{ fontWeight: 'bold', left: '60px', top: '20px' }}>
                <Typography
                    color="text.secondary"
                    variant="subtitle1"
                >
                    post time:
                    {data.Post_created_date}
                </Typography>
            </ListItem>
            <Box sx={{ my: 5, mx: 10 }}>
                <Grid container alignItems="center">
                    <Grid item xs>
                        <Typography gutterBottom variant="h4" component="div">
                            # {data.Post_title}
                        </Typography>
                    </Grid>
                </Grid>
                <Typography color="rgba(28,28,28,1)" variant="body1" sx={{ mx: 4 }}>
                    {data.Post_content}
                </Typography>
            </Box>
            <Divider variant="middle" />
            <Box sx={{ mt: 3, ml: 1, mb: 1 }}>
                <Button onClick={handleAddComment.bind(this, data.id)}>Add comment</Button>
            </Box>
            {renderItems}
        </Box>
    )
}

