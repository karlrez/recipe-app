import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://recipegram-api.karl-rez.com/'
});

export default instance;