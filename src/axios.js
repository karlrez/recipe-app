import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://karlrez.pythonanywhere.com/'
});

export default instance;