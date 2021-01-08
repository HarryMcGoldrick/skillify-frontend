import 'regenerator-runtime/runtime';
import axios from '../utils/axios';

const baseUrl = 'http://localhost:3000/user';

export const login = (username, password) => axios.post(`${baseUrl}/login`, { username, password }).then((res) => res.data);

export const register = (username, password) => axios.post(`${baseUrl}/register`, { username, password }).then((res) => res.data);

export const getUserInfo = (userId) => axios.get(`${baseUrl}/${userId}/userinfo`).then((res) => res.data);

export const getUserProgressInfo = (userId) => axios.get(`${baseUrl}/${userId}/progress`).then((res) => res.data);
