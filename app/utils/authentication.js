import Cookies from 'js-cookie';

// Parse the JWT token stored inside the cookies
export const getSession = (jwt) => {
  let session;
  try {
    if (jwt) {
      const base64Url = jwt.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      session = JSON.parse(window.atob(base64));
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
  return session;
};

// Assumes cookie exists, use with isAuthenticated
export const getExistingSession = () => {
  const jwt = Cookies.get('access_token');
  let session;
  try {
    if (jwt) {
      const base64Url = jwt.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      session = JSON.parse(window.atob(base64));
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
  return session;
};

export const logOut = () => {
  Cookies.remove('access_token');
  localStorage.removeItem('userId');
};

export const isAuthenticated = () => !!(Cookies.get('access_token') && localStorage.getItem('username'));

export const getUserId = () => getSession(Cookies.get('access_token')).userId;

export const getUserName = () => localStorage.getItem('username');
