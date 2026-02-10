const ADMIN_KEY = "is_admin_logged_in";

export const loginAdmin = (password: string) => {
  const correctPassword = import.meta.env.VITE_ADMIN_PASSWORD;

  if (password === correctPassword) {
    localStorage.setItem(ADMIN_KEY, "true");
    return true;
  }
  return false;
};

export const isAdminLoggedIn = () => {
  return localStorage.getItem(ADMIN_KEY) === "true";
};

export const logoutAdmin = () => {
  localStorage.removeItem(ADMIN_KEY);
};
