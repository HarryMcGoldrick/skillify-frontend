import 'regenerator-runtime/runtime';
import axios from '../utils/axios';

export const login = (username, password) => axios.post('http://localhost:3000/user/login', { username, password }).then((res) => res.data);

export const register = (username, password) => axios.post('http://localhost:3000/user/register', { username, password }).then((res) => res.data);

export const getUserInfo = (userId) => axios.get(`http://localhost:3000/user/${userId}/userinfo`).then((res) => res.data);
