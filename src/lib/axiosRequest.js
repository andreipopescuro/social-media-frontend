import axios from "axios";
// const baseURL = "http://localhost:5000/api";
const baseURL = "https://social-media-backend-cthx.onrender.com/api";
export const createAxiosInstance = (token) => {
  const instance = axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return instance;
};
