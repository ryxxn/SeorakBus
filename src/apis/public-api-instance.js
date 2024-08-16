import axios from 'axios';
import { xmlToJson } from '../utils/xml-to-json';

const TIMEOUT_TIME = 10_000;

// 공공 api 전용 axios instance
export const publicApiInstance = axios.create({});

// create cancel token
const cancelTokenSource = () => {
  const cancelToken = axios.CancelToken.source();
  return {
    token: cancelToken.token,
    cancel: cancelToken.cancel,
  };
};

let firstRequestCancelToken = null;
// Request interceptor for API calls

publicApiInstance.interceptors.request.use(
  async (config) => {

    firstRequestCancelToken = cancelTokenSource();
    config.cancelToken = firstRequestCancelToken.token;
    config.timeout = TIMEOUT_TIME;
    return config;
  },
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || 'Something went wrong'
    )
);

publicApiInstance.interceptors.response.use(
  (response) => {
    // xml to json
    const parser = new DOMParser();

    const xmlDoc = parser.parseFromString(response.data, 'text/xml');
    const json = xmlToJson(xmlDoc);

    response.data = json;

    return response;
  },
  async (error) => {
    // timeout
    if (axios.isCancel(error)) {
      Promise.resolve();
    }

    return Promise.reject(
      (error.response && error.response.data) || 'Something went wrong'
    );
  }
);
