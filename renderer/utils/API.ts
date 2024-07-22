import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export const fetcher = (url: string) => API.get(url).then((res) => res.data);

export default API;
