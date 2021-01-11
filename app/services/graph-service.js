import 'regenerator-runtime/runtime';
import axios from '../utils/axios';

const baseUrl = 'http://localhost:3000/graph';

export const createNewGraph = (name, description, userId) => axios.post(`${baseUrl}/create`, { name, description, userId }).then((res) => res.data);

export const loadGraphElements = async (id) => axios.get(`${baseUrl}/${id}`).then((res) => res.data);

export const updateGraphElements = async (id, elements, image) => axios.post(`${baseUrl}/${id}`, {
  nodes: elements.nodes,
  edges: elements.edges,
  image,
}).then((res) => res.data);

export const sendGraphDataForImage = async (id, elements) => axios.post(`${baseUrl}/${id}/image`, { elements }).then((res) => res.data);

export const getGraphViews = async () => axios.get(`${baseUrl}/views`).then((res) => res.data);

export const addGraphToGraphProgress = async (graphId, userId) => axios.post(`${baseUrl}/progress`, { graphId, userId }).then((res) => res.data);

export const addNodeToGraphProgress = async (nodeId, graphId, userId) => axios.post(`${baseUrl}/progress/node`, { graphId, userId, nodeId }).then((res) => res.data);
