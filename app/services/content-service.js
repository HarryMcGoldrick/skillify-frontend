import 'regenerator-runtime/runtime';
import axios from '../utils/axios';

const baseUrl = 'http://localhost:3000/content';


// eslint-disable-next-line import/prefer-default-export
export const getYoutubeVideoForNode = async (label) => axios.get(`/content/youtube?label=${label}`);

export const getDataFromYoutubeId = async (videoId) => axios.get(`${baseUrl}/youtube/${videoId}`).then(res => res.data);

export const getDataFromGoogleBooksId = async (url) => axios.get('/');

export const getExternalIdFromUrl = async (url) => axios.get('/');

export const addContentToNode = async (graphId, nodeId, content) => axios.post(`${baseUrl}`, { graphId, nodeId, content }).then((res) => res.data);