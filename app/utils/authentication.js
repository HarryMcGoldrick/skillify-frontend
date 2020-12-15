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

export const logOut = () => {
  Cookies.remove('access_token');
};

export const isAuthenticated = () => !!Cookies.get('access_token');
