import React from 'react';
import Axios from '../global/api/Axios';
import { useState, useEffect } from 'react';
import { AccountCircle } from '@mui/icons-material';
// import  from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';

import { useNavigate } from "react-router-dom";
import { getUsername, refreshToken } from '../global/api/getToken';
import { useGlobalState } from '../global/api/ContextProvider';


import { Link as RouterLink } from 'react-router-dom';
// material
import { Button, Typography, Grid, Container, Stack } from '@mui/material';
// components
import Page from '../temp/Page';
import Iconify from '../temp/Iconify';
import { BlogPostCard } from '../temp/dashboard';
// mock

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];


export default function ForumList() {

  const [data, setData] = useState([]);
  const [state, setState] = useGlobalState();
  const navigate = useNavigate();
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

  function handleThreadPage(forum) {
    navigate(`/forum/${forum.id}`, { state: forum.id })
  }

  useEffect(() => {
    fetchData();
    refreshToken();
    getUsername().then((res) => res.json())
      .then((res) => {
        setState({ ...state, username: res.user });
      });
  }, [])
  const { username } = state;


  return (
    <Page title="Dashboard: Blog">
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