import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    "process.env": { ...process.env, ...(import.meta as any).env },
  },
});
