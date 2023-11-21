// import { appConfig } from "./app";

// export const env = {
//   mode: "local",
// };

// export const baseURL = () => appConfig[env.mode].baseURL;
const { VITE_baseURL } = import.meta.env;

const baseURL = () => VITE_baseURL;

export { baseURL };
