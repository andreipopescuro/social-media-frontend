import axios from "axios";
const baseURL = "http://localhost:5000/api";
export const createAxiosInstance = (token) => {
  const instance = axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return instance;
};
