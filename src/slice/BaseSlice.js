export const isAuthenticated = (state) =>
  (state?.token && state?.token.length > 4);