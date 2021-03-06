import Cookies from "universal-cookie";
import { setCookie, getCookie } from "./cookie";

const cookies = new Cookies

async function getUsername() {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + getCookie('access'));

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    const username = await fetch("http://127.0.0.1:8000/auth/username/", requestOptions)
        .then(response => response.text())
        .then(result => { return JSON.parse(result).user; })
        .catch(error => console.log('error', error));

    return username;
};

function refresh() {
    var formdata = new FormData();
    formdata.append("refresh", cookies.get('refreshTok'));
    // console.log(getCookie('refresh'));
    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    fetch("http://127.0.0.1:8000/auth/login/refresh/", requestOptions)
        .then(response => response.text())
        .then((result) => {
            const json = JSON.parse(result);
            cookies.set('accessTok', json.access);
            cookies.set('refreshTok', json.refresh);
            // setCookie('access', json.access);
            // setCookie('refresh', json.refresh);
        })
        .catch((error) => {
            console.log('error', error);
        });

}

export { refresh, getUsername };