import axios from 'axios';
import { API_URL } from 'keys';
const baseURL = API_URL;

const axiosInstance = (headers) => {
  let instance = axios.create({
    baseURL,
    mode: 'no-cors',
    headers,
  });

  return instance;
};

const Get = async (route, params = {}, headers = {}) => {
  try {
    const { data } = await axiosInstance(headers).get(route, {
      params,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

const Post = async (route, json = {}, headers = {}) => {
  try {
    const { data } = await axiosInstance(headers).post(route, json);
    return data;
  } catch (error) {
    throw error;
  }
};

const Patch = async (route, json = {}, headers = {}) => {
  try {
    const { data } = await axiosInstance(headers).patch(route, json);
    return data;
  } catch (error) {
    throw error;
  }
};

export { Get, Post, Patch };
