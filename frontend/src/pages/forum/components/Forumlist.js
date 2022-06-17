import React from 'react';
import Axios from '../../../global/api/Axios';
import { useState, useEffect } from 'react';

import { useNavigate } from "react-router-dom";
import { getUsername, refreshToken } from '../../../global/api/getToken';
import { useGlobalState } from '../../../global/api/ContextProvider';


import { Link as RouterLink } from 'react-router-dom';
// material
import { Button, Typography, Grid, Container, Stack } from '@mui/material';
// components
import Page from '../../../global/component/Page';
import Iconify from '../../../global/component/Iconify';
import BlogPostCard from './BlogPostCard';
import Cookies from 'universal-cookie';
// mock

// ----------------------------------------------------------------------

// const SORT_OPTIONS = [
//     { value: 'latest', label: 'Latest' },
//     { value: 'popular', label: 'Popular' },
//     { value: 'oldest', label: 'Oldest' },
// ];


export default function ForumList() {

    const [data, setData] = useState([]);
    const [state, setState] = useGlobalState();
    const navigate = useNavigate();
    const cookies = new Cookies();
    async function fetchData() {
        try {
            const response = await Axios.get("api/forum/forum/");
            const data = await response.data;
            const revData = data.reverse()
            setData(revData);

        } catch (err) {
            console.log(err);
        }
    }

    async function handlePostDelete(forumID) {
        console.log(forumID);
        await Axios.delete('api/forum/forum/' + forumID + '/');
        fetchData();
    }

    useEffect(() => {
        fetchData();
        refreshToken();
        getUsername().then((res) => res.json())
            .then((res) => {
                console.log(res.user);
                setState({ ...state, username: res.user });
                return res.user;
            }).then((username) => {
                cookies.set('username', username);
            });
    }, [])

    const username = cookies.get('username');

    return (
        <Page title="Blog">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Blog
                    </Typography>
                    <Button variant="contained" component={RouterLink} to="/forum/create" startIcon={<Iconify icon="eva:plus-fill" />}>
                        New Post
                    </Button>
                </Stack>

                {/* <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSearch posts={POSTS} />
          <BlogPostsSort options={SORT_OPTIONS} />
        </Stack> */}

                <Grid container spacing={3}>
                    {data.map((post, index) => (
                        <BlogPostCard key={post.id} post={post} index={index} />
                    ))}
                </Grid>
            </Container>
        </Page>
    );
}