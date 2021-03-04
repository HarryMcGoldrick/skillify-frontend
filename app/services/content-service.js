import 'regenerator-runtime/runtime';
import axios from '../utils/axios';

const baseUrl = 'http://localhost:3000/content';


// eslint-disable-next-line import/prefer-default-export
export const getYoutubeVideoForNode = async (searchQuery) => axios.get(`/content/youtube?searchQuery=${searchQuery}`).then(res => res.data);

export const getGoogleBooksForNode = async (searchQuery) => axios.get(`/content/googlebooks?searchQuery=${searchQuery}`).then(res => res.data);

export const getDataFromYoutubeId = async (videoId) => axios.get(`${baseUrl}/youtube/${videoId}`).then(res => res.data);

export const getDataFromGoogleBooksId = async (volumeId) => axios.get(`${baseUrl}/googlebooks/${volumeId}`).then(res => res.data);

export const addContent = async (nodeId, content) => axios.post(`${baseUrl}`, { nodeId, content }).then((res) => res.data);

export const getContentForNode = async (nodeId) => axios.get(`${baseUrl}/${nodeId}`).then((res) => res.data);

export const removeContent = async (contentId) => axios.delete(`${baseUrl}/${contentId}`).then((res) => res.data);