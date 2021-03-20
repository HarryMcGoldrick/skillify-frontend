import 'regenerator-runtime/runtime';
import axios from '../utils/axios';

const baseUrl = 'http://localhost:3000/user';

export const login = (username, password) => axios.post(`${baseUrl}/login`, { username, password }).then((res) => res.data);

export const register = (username, password) => axios.post(`${baseUrl}/register`, { username, password }).then((res) => res.data);

export const getUserInfo = (userId) => axios.get(`${baseUrl}/${userId}/userinfo`).then((res) => res.data);

export const getUserProgressInfo = (userId, graphId) => axios.post(`${baseUrl}/progress`, { userId, graphId }).then((res) => res.data);

export const updateLikedContent = async (userId, contentId) => axios.post(`${baseUrl}/content`, { userId, contentId }).then((res) => res.data);
