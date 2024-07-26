import axios from 'axios';
import { tokenS } from './stores/tokenS';

const instance = axios.create({
  baseURL: 'http://localhost:8080/api',
});

instance.interceptors.request.use(
  (config) => {
    const tokenStore = tokenS();
    const token = tokenStore.token;

    if (token) {
      console.log("si aqui" +  token)
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
