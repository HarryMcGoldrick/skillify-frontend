import 'regenerator-runtime/runtime';
import axios from '../utils/axios';

export const createNewGraph = (name, description) => axios.post('http://localhost:3000/graph', { name, description }).then((res) => res.data);

export const loadGraphElements = async (id) => axios.get(`http://localhost:3000/graph/${id}`).then((res) => res.data);

export const updateGraphElements = async (id, elements) => axios.post(`http://localhost:3000/graph/${id}`, {
  nodes: elements.nodes,
  edges: elements.edges,
}).then((res) => res.data);

export const getGraphViews = async () => axios.get('http://localhost:3000/graph/views').then((res) => res.data);
