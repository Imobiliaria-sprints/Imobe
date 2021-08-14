import axios from "axios";
import { parseCookies } from "nookies";

const { "imobeflex.token": token } = parseCookies();

const api = axios.create({
  baseURL: "http://localhost:3333/",
});

if (token) {
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
}

export default api;
