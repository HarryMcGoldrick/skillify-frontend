import 'regenerator-runtime/runtime';

export const createNewGraph = (name) => {
  const response = fetch('http://localhost:3000/graph', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
    }),
  }).then((res) => res.json()).then((data) => data);
  return response;
};

export const loadGraphElements = async (id) => {
  const response = fetch(`http://localhost:3000/graph/${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
  return response;
};

export const updateGraphElements = async (id, elements) => {
  const response = fetch(`http://localhost:3000/graph/${id}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nodes: elements.nodes,
      edges: elements.edges,
    }),
  }).then((res) => res.json());
  return response;
};

export const getGraphViews = async () => {
  const response = fetch('http://localhost:3000/graph/views', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
  return response;
};
