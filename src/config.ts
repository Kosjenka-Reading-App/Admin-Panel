// eslint-disable-next-line @typescript-eslint/no-explicit-any
const env = (import.meta as any).env;

export default {
  API_BASE_ROUTE: env.VITE_BACKEND_URL,
};
