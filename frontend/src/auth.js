import { setCookie, getCookie } from "./cookie";

function refresh() {
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
        .catch((error) => {
            console.log('error', error);
            logout();
        });

}

export { refresh };