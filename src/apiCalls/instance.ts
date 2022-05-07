import axios from "axios";

const instance = axios.create({
  baseURL: "http://front-api-test.wsafar.com",
});

//we can add aditional global headers for all reqs here
instance.interceptors.request.use((config) => {
  if (config?.headers) config.headers.accept = "application/json";
  return config;
});

export default instance;
