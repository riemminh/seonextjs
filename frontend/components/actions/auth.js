import axios from "axios";
import { API } from "../../config";
import cookie from "js-cookie";

export const signup = user => {
  return axios.post(`${API}/api/signup`, user);
};

export const signin = user => {
  return axios.post(`${API}/api/signin`, user);
};

export const singout = next => {
  removeCookie("token");
  removeLocalStorage("user");
  next();
};

// set cookie
export const setCookie = (key, value) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: 1
    });
  }
};

// remove cookie
export const removeCookie = key => {
  if (process.browser) {
    cookie.remove(key);
  }
};

// get cookie
export const getCookie = key => {
  return cookie.get(key);
};

// set localStorage
export const setLocalStorage = (key, value) => {
  if (process.browser) {
    localStorage.set(key, JSON.stringify(value));
  }
};

// remove localStorage
export const removeLocalStorage = key => {
  if (process.browser) {
    localStorage.removeItem(key);
  }
};

// get localStorage
export const getLocalStorage = key => {
  return localStorage.getItem(key);
};

// authenticate
export const authenticate = (data, next) => {
  setCookie("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
  next();
};

// isAuth
export const isAuth = () => {
  if (process.browser) {
    const cookieChecked = getCookie("token");
    if (cookieChecked) {
      if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"));
      } else {
        return false;
      }
    }
  }
};
