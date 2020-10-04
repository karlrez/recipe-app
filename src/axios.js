import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://karlrez.pythonanywhere.com/'
});

export default instance;