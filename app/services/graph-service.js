export const saveGraphElements = (elements) => {
  fetch('http://localhost:3000/graph', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      elements,
    }),
  }).then((res) => console.log(res)).catch((err) => console.log(err));
};

export const loadGraphElements = () => {
  fetch('http://localhost:3000/graph', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((res) => console.log(res)).catch((err) => console.log(err));
};
