import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:1957",
});

export default api;
