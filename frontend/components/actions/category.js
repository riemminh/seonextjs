import axios from "axios";
import { API } from "../../config";

export const create = category => {
  return axios.post(`${API}/category`, category).then(res => res.data);
};

export const getCategories = () => {
  return axios.get(`${API}/categories`).then(res => res.data);
};

export const removeCategory = slug => {
  return axios.delete(`${API}/category/${slug}`);
};
