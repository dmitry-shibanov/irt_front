import axios from 'axios';

const instanceAxios = axios.create({
  baseURL: 'http://localhost:3700',

  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json', // application/x-www-form-urlencoded
  },
  adapter: require('axios/lib/adapters/http'),
});

export default instanceAxios;
