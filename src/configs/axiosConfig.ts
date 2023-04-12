import axios from 'axios';
import { camelizeKeys } from 'humps';

const instance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.response.use(
  (response) => {
    if (response.data) {
      response.data = camelizeKeys(response.data);
    }
    // console.log(response.headers['content-type']);
    // console.log(camelizeKeys(response.data));
	  // get response header
    return response.data ? response.data : response;
  },
  (error) => {}
);

export default instance;
