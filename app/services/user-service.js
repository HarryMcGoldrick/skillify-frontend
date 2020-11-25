import 'regenerator-runtime/runtime';

export const login = (username, password) => {
  fetch('http://localhost:3000/user/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  }).then((res) => console.log(res)).catch((err) => console.log(err));
};

export const register = (username, password) => {
  fetch('http://localhost:3000/user/register', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  }).then((res) => console.log(res)).catch((err) => console.log(err));
};