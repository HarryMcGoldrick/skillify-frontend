import 'regenerator-runtime/runtime';
import axios from '../utils/axios';

// eslint-disable-next-line import/prefer-default-export
export const getYoutubeVideoForNode = async (label) => axios.get(`/content/youtube?label=${label}`);
