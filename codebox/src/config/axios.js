import axios from 'axios';

const clientAxios = axios.create({
    baseURL: 'https://code-box-api.herokuapp.com/api'
});

export default clientAxios;