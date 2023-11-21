import axios from "axios";

const { VITE_baseURL } = import.meta.env;

// axios.defaults.withCredentials = true;

export const request = axios.create({
  baseURL: VITE_baseURL,
});
