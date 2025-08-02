import { jwtDecode } from "jwt-decode";

export const useUserId = () => {
  const token = localStorage.getItem("admin_token");
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    return decoded?.sid || null;
  } catch (e) {
    console.error("Invalid token", e);
    localStorage.removeItem("admin_token");
    return null;
  }
};
