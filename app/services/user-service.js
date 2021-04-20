import 'regenerator-runtime/runtime';
import axios from '../utils/axios';

const baseUrl = 'http://localhost:3000/user';

export const login = (username, password) => axios.post(`${baseUrl}/login`, { username, password }).then((res) => res.data);

export const register = (username, password) => axios.post(`${baseUrl}/register`, { username, password }).then((res) => res.data);

export const getUserInfo = (userId) => axios.get(`${baseUrl}/${userId}/userinfo`).then((res) => res.data);

export const getUserInfoByUsername = (username) => axios.post(`${baseUrl}/userinfo`, { username }).then((res) => res.data);

export const getUserProgressInfo = (userId, graphId) => axios.post(`${baseUrl}/progress`, { userId, graphId }).then((res) => res.data);

export const updateLikedContent = async (userId, contentId) => axios.post(`${baseUrl}/like/content`, { userId, contentId }).then((res) => res.data);

export const updateLikedGraph = async (userId, graphId) => axios.post(`${baseUrl}/like/graph`, { userId, graphId }).then((res) => res.data);

export const uploadUserImage = async (username, image) => axios.post(`${baseUrl}/image`, { username, image }).then((res) => res.data);

export const getUserImage = async (username) => axios.get(`${baseUrl}/${username}/image`).then((res) => res.data);

export const updateUserPrivacy = async (userId, privacy) => axios.post(`${baseUrl}/privacy`, { userId, privacy }).then((res) => res.data);
