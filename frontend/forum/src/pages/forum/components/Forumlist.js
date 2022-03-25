import React, { Fragment } from 'react';
import axios from "../../../global/api/Axios";
import { useState, useEffect } from 'react';
import { maxWidth } from '@mui/system';
import { DeleteForever, AccountCircle } from '@mui/icons-material';
// import  from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Typography, Avatar, ListItemAvatar, ListItemText, Divider, ListItem, List } from '@mui/material';
import { useNavigate } from "react-router-dom";




export default function ForumList() {

    const [data, setData] = useState([]);
    const navigate = useNavigate();
    async function fetchData() {
        try {
            const response = await axios.get("api/forum/");
            const data = await response.data;
            const revData = data.reverse()
            setData(revData);

        } catch (err) {
            console.log(err);
        }
    }

    async function handlePostDelete(forumID) {
        const res = await axios.delete('api/forum/' + forumID + '/');
        fetchData();
    }

    function handleThreadPage(forum) {
        navigate(`/forum/${forum.id}`, { state: forum })
    }

    useEffect(() => {
        fetchData()
    }, [])



    const renderItems = data.map((data, index) => {
        return (
            <div>
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
                                <Button onClick={handleThreadPage.bind(this, data)}>
                                    <Typography
                                        sx={{ display: 'inline', fontWeight: 'bold' }}
                                        component="div"
                                        variant="h6"
                                        color="rgba(1,13,133,1)"
                                    >
                                        {data.Post_title}
                                    </Typography>
                                </Button>
                                <div style={{ display: 'flex' }}>
                                    <Button variant="outlined" startIcon={<DeleteIcon />} size="small"
                                        onClick={handlePostDelete.bind(this, data.id)} sx={{ color: 'rgba(240,0, 40, 0.8)' }} >
                                        Delete
                                    </Button>
                                </div>
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
                                    {data.Post_author}
                                </Typography>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body1"
                                    color="text.primary"
                                >
                                    - {data.Post_content}
                                </Typography>

                            </React.Fragment>
                        }
                    //Post time {data.Post_created_date}
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
            </div >
        )
    })

    return (
        <List sx={{ width: '100%', maxWidth: "69%", bgcolor: 'background.paper', position: "relative", left: "15%", top: "50px", border: 7, }}>
            {renderItems}
        </List>
    );
}