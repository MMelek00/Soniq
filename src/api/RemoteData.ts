// General api to access data
import Axios, {AxiosResponse} from 'axios';
import ApiConstants from './ApiConstants';

const client = Axios.create({
  baseURL: ApiConstants.BASE_URL_SECURE,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const get = async (path: string, params?: any): Promise<AxiosResponse> => {
  const config = {
    url: `${ApiConstants.BASE_URL_SECURE}${path}`,
    baseURL: ApiConstants.BASE_URL_SECURE,
    method: 'GET',
    params: params,
  };

  return client.request(config);
};

const post = async (
  path: string,
  params?: any,
  data?: any,
): Promise<AxiosResponse> => {
  const config = {
    url: `${ApiConstants.BASE_URL_SECURE}${path}`,
    baseURL: ApiConstants.BASE_URL_SECURE,
    method: 'POST',
    params: params,
    data: data,
  };
  return client.request(config);
};

const put = async (path: string, data?: any): Promise<AxiosResponse> => {
  const config = {
    url: `${ApiConstants.BASE_URL_SECURE}${path}`,
    baseURL: ApiConstants.BASE_URL_SECURE,
    method: 'PUT',
    data: data,
  };
  return client.request(config);
};
const patch = async (path: string, data?: any): Promise<AxiosResponse> => {
  const config = {
    url: `${ApiConstants.BASE_URL_SECURE}${path}`,
    baseURL: ApiConstants.BASE_URL_SECURE,
    method: 'PATCH',
    data: data,
  };
  return client.request(config);
};
const remove = async (path: string, data?: any): Promise<AxiosResponse> => {
  const config = {
    url: `${ApiConstants.BASE_URL_SECURE}${path}`,
    baseURL: ApiConstants.BASE_URL_SECURE,
    method: 'DELETE',
    data: data,
  };
  return client.request(config);
};

export default {
  get,
  post,
  put,
  patch,
  remove,
};
