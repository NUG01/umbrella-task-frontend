import axios from "axios";

const BasicAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

BasicAxios.defaults.withCredentials = true;

export default BasicAxios;
