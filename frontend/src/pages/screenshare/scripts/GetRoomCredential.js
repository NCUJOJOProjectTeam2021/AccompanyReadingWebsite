async function getRoomCredentials(username) {
    const response = await fetch('http://localhost:8000/api/token/' + username);
    const token = await response.text();
    return token;
}

export { getRoomCredentials };