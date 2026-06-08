import { defineConfig } from "vite";

export default defineConfig({
	build: {
		chunkSizeWarningLimit: 1000,
	},
	server: {
		open: true,
		browser: process.env.BROWSER,
	},
});
