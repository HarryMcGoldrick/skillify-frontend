import 'regenerator-runtime/runtime';
import axios from '../utils/axios';

const baseUrl = 'http://localhost:3000/objective';

export const updateObjectives = async (userId, nodeId, items) => axios.post(`${baseUrl}`, {
  nodeId, userId, items,
}).then((res) => res.data);

export const fetchObjectives = async (userId, nodeId) => axios.get(`${baseUrl}/${userId}/${nodeId}`).then((res) => res.data);
