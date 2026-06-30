import { apiClient } from "./apiClient";

export const authService = {
  login: (email, password) =>
    apiClient.post("/auth/login", {
      email,
      password,
    }),

  register: (data) =>
    apiClient.post("/auth/register", data),

  forgotPassword: (email) =>
    apiClient.post("/auth/forgot-password", {
      email,
    }),

  updateProfile: (data) =>
    apiClient.put("/users/profile", data),

  googleLogin: () => {
    window.location.href =
      "http://localhost:5000/api/auth/google";
  },

  resetPassword: (token, password) =>
  apiClient.post(`/auth/reset-password/${token}`, {
    password,
  }),
};