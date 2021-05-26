import 'regenerator-runtime/runtime';
import axios from '../utils/axios';

const baseUrl = 'http://localhost:3000/achievement';

export const pollAchievements = async (userId) => axios.get(`${baseUrl}/poll/${userId}`).then((res) => res.data);

export const getAchievementObjects = async (achievementNames) => axios.post(`${baseUrl}/objects`, { achievementNames }).then((res) => res.data);

export const getAllAchievements = async () => axios.get(`${baseUrl}`).then((res) => res.data);
