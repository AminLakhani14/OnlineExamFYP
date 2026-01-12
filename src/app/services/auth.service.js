import axios from "axios.js";

export const login = (email, password, type) => {
  return axios.post("/api/Registration/Login", {
    UserName: email,
    Password: password,
    Type: type || "GUEST",
  });
};

export const register = (userData) => {
  return axios.post("/api/Registration/post-Register", userData);
};

export const getUserById = (id) => {
  return axios.get(`/api/Registration/${id}`);
};
