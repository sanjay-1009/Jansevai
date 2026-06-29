import { jwtDecode } from "jwt-decode";

export const getToken = () => localStorage.getItem("jwtToken");

export const getRole = () => {
  const token = getToken();
  if (!token) return null;

  const decoded = jwtDecode(token);
  return decoded["cognito:groups"]?.[0];
};

export const isLoggedIn = () => {
  return !!getToken();
};