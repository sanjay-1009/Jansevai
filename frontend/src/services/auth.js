import { jwtDecode } from "jwt-decode";

export const getToken = () => {
  return localStorage.getItem("jwtToken");
};

export const getUser = () => {
  const token = getToken();
  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch (e) {
    return null;
  }
};

export const getRole = () => {
  const user = getUser();

  const groups = user?.["cognito:groups"] || [];

  if (groups.includes("Admins")) return "admin";
  return "citizen";
};

export const isLoggedIn = () => {
  return !!getToken();
};