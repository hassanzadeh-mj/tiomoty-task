import axios from 'axios';

const axiosClient = axios.create();
axiosClient.defaults.baseURL = 'https://jsonplaceholder.org/';
axiosClient.defaults.headers.common["Content-Type"] = 'application/json'


export default axiosClient;