// services/Guard.js
export default {
  auth(to, from, next) {
    const isAuthenticated = true; // Aqui você verificaria seu token, sessão, etc.
    if (isAuthenticated) {
      next();
    } else {
      next("/login");
    }
  },
};
