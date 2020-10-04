import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://karlrezz.pythonanywhere.com/'
});

export default instance;