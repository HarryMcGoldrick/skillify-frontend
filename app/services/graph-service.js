import 'regenerator-runtime/runtime';
import qs from 'qs';
import axios from '../utils/axios';

const baseUrl = 'http://localhost:3000/graph';

export const createNewGraph = (name, description, userId, tags) => axios.post(`${baseUrl}/create`, {
  name, description, userId, tags,
}).then((res) => res.data);

export const loadGraphElements = async (id) => axios.get(`${baseUrl}/${id}`).then((res) => res.data);

export const updateGraphElements = async (id, elements) => axios.post(`${baseUrl}/${id}`, {
  nodes: elements.nodes,
  edges: elements.edges,
}).then((res) => res.data);

export const updateGraphStyle = async (id, styleSheet) => axios.post(`${baseUrl}/${id}/style`, { styleSheet }).then((res) => res.data);

export const fetchGraphStyle = async (id) => axios.get(`${baseUrl}/${id}/style`).then((res) => res.data);

export const sendGraphDataForImage = async (id, elements) => axios.post(`${baseUrl}/${id}/image`, { elements }).then((res) => res.data);

export const getGraphViews = async (name, tags, page, pageSize) => axios.get(`${baseUrl}/views`, {
  params: {
    name, tags, page, pageSize,
  },
  paramsSerializer: (params) => qs.stringify(params, { indices: false, arrayFormat: 'brackets' }),
}).then((res) => res.data);

export const getMultipleGraphViews = async (graphIds) => axios.post(`${baseUrl}/views`, { graphIds }).then((res) => res.data);

export const addGraphToGraphProgress = async (graphId, userId) => axios.post(`${baseUrl}/progress`, { graphId, userId }).then((res) => res.data);

export const addNodeToGraphProgress = async (nodeId, graphId, userId) => axios.post(`${baseUrl}/progress/node`, { graphId, userId, nodeId }).then((res) => res.data);

export const removeGraphFromGraphProgress = async (graphId, userId) => axios.post(`${baseUrl}/progress/remove`, { graphId, userId }).then((res) => res.data);

export const removeNodeFromGraphProgress = async (nodeId, graphId, userId) => axios.post(`${baseUrl}/progress/node/remove`, { graphId, userId, nodeId }).then((res) => res.data);

export const updateGraphPrivacy = async (graphId, privacy) => axios.post(`${baseUrl}/${graphId}/privacy`, { privacy }).then((res) => res.data);
