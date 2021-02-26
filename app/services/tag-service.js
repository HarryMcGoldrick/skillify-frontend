import 'regenerator-runtime/runtime';
import axios from '../utils/axios';

const baseUrl = 'http://localhost:3000/tag';

export const getAllTags = async () => axios.get(`${baseUrl}`).then((res) => res.data);
