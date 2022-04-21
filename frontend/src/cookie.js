function setCookie(cname, cvalue) {
    const d = new Date();
    var parameter = cname + '=' + cvalue;

    document.cookie = parameter;
}

function getCookie(cname) {
    const target = cname + '=';
    return document.cookie
        .split('; ')
        .find(row => row.startsWith(target))
        .split('=')[1];
}

export { setCookie, getCookie }