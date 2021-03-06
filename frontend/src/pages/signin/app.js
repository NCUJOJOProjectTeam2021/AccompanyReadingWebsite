import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getCookie, setCookie } from '../../global/api/cookie';
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import GetTwilioToken from '../../global/api/getTwilioToken';



function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function SignIn() {
    const cookies = new Cookies();
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const loginjson = {
            "email": data.get('email'),
            "password": data.get('password'),
        };

        fetch('auth/login/', {
            method: 'Post',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },

            body: JSON.stringify(loginjson)
        }).then(
            (res) => {
                if (res.ok) {
                    const resbody = res.text();
                    resbody.then((result) => {
                        const jwtjson = JSON.parse(result);

                        cookies.set('loginToken', true);
                        setCookie('refreshTok', jwtjson.refresh, { path: '/', expires: 50 * 365 });
                        setCookie('accessTok', jwtjson.access, { path: '/', expires: 50 * 365 });
                        // console.log('refresh: ' + getCookie('refresh'));
                        // console.log('access: ' + getCookie('access'));
                        navigate('/forum');
                    }).catch(
                        error => console.log(error)
                    )
                }
                else {
                    if (res.status === 401) {
                        alert('unauthorized');
                    }
                }

            }
        ).catch(
            error => console.log(error)
        )
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        {/* <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        /> */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            {/* <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid> */}
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}