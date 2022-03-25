import _axios from 'axios'

const axios = (baseURL) => {
    const instance = _axios.create({
        baseURL: baseURL || 'http://localhost:8000/',
        timeout: 3000,
    });
    return instance;
}

export { axios };
export default axios();