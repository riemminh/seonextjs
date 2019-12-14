import axios from "axios";
import { API } from "../../config";

export const create = tag => {
  return axios.post(`${API}/tag`, tag).then(res => res.data);
};

export const getTags = () => {
  return axios.get(`${API}/tags`).then(res => res.data);
};

export const singleTag = slug => {
  return axios.get(`${API}/tag/${slug}`);
};

export const removeTag = slug => {
  return axios.delete(`${API}/tag/${slug}`);
};
