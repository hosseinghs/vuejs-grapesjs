import axios from "axios";

const API = {
  init() {
    axios.defaults.baseURL = "https://staging-4.ibdok.ir/api/sandbox/";
  },

  query(route, params) {
    return axios.get(route, params);
  },

  get(route) {
    return axios.get(route);
  },

  post(route, params) {
    return axios.post(route, params);
  },

  delete(route, params) {
    return axios.delete(route, params);
  },
};

export default API;
