import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 3000,
		proxy: {
			"/api/v1": {
				target: "http://blog_backend:5000", // Replace localhost with the backend container name
				changeOrigin: true,
			},
		},
	},
});
