import axios from 'axios';
import Cookies from 'js-cookie';

axios.defaults.baseURL = 'http://localhost:3000/';
axios.defaults.headers.common = { Authorization: `bearer ${Cookies.get('access_token')}` };
export default axios;
