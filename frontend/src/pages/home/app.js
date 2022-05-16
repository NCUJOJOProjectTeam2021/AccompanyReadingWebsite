import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { getCookie, setCookie } from "../../global/api/cookie";


export const getUsername = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + getCookie('access'));

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    const res = fetch("http://127.0.0.1:8000/auth/username/", requestOptions)
        .then((response) => {
            return response;
        })
        .catch(error => console.log('error', error));
    return res;
};

export const refreshToken = () => {
    var formdata = new FormData();
    formdata.append("refresh", getCookie('refresh'));

    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    fetch("http://127.0.0.1:8000/auth/login/refresh/", requestOptions)
        .then(response => response.text())
        .then((result) => {
            console.log(result);
            const json = JSON.parse(result);
            setCookie('access', json.access);
            setCookie('refresh', json.refresh);
        })
        .catch(error => console.log('error', error));
}



export default function HomePage(props) {


    const handleSubmit = (event) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + getCookie('access'));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://127.0.0.1:8000/auth/username/", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    };

    const handleRefresh = (event) => {
        var formdata = new FormData();
        formdata.append("refresh", getCookie('refresh'));

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch("http://127.0.0.1:8000/auth/login/refresh/", requestOptions)
            .then(response => response.text())
            .then((result) => {
                const json = JSON.parse(result);
                setCookie('access', json.access);
                setCookie('refresh', json.refresh);
            })
            .catch(error => console.log('error', error));
    }

    return (
        <div>
            <h1>Welcome</h1>
            <div>
                <ul>
                    <li><Link to="/signin">Sign In</Link></li>
                    <li><Link to="/signup">Sign Up</Link></li>
                </ul>
            </div>
            <Button onClick={handleSubmit}>access</Button>
            <Button onClick={handleRefresh}>refresh</Button>
        </div>
    );
};