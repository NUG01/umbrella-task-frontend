import axios from "axios";
const MediaAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

MediaAxios.defaults.withCredentials = true;

export default MediaAxios;
