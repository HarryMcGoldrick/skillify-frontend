import 'regenerator-runtime/runtime';
import axios from '../utils/axios';

const baseUrl = 'http://localhost:3000/content';


// eslint-disable-next-line import/prefer-default-export
export const getYoutubeVideoForNode = async (label) => axios.get(`/content/youtube?label=${label}`);

export const getDataFromYoutubeId = async (videoId) => axios.get(`${baseUrl}/youtube/${videoId}`).then(res => res.data);

export const addContent = async (nodeId, content) => axios.post(`${baseUrl}`, { nodeId, content }).then((res) => res.data);

export const getContentForNode = async (nodeId) => axios.get(`${baseUrl}/${nodeId}`).then((res) => res.data);

export const removeContent = async (contentId) => axios.delete(`${baseUrl}/${contentId}`).then((res) => res.data);