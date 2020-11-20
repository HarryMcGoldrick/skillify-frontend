import 'regenerator-runtime/runtime';

export const saveGraphElements = (elements) => {
  fetch('http://localhost:3000/graph', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nodes: elements.nodes,
      edges: elements.edges,
    }),
  }).then((res) => console.log(res)).catch((err) => console.log(err));
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
