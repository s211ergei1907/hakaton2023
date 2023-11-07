import axios from "axios";

const instance = axios.create({
  baseURL: "https://fec0-192-162-251-16.ngrok.io/",
});

export default instance;
