import { defineConfig } from "vite";

export default defineConfig({
    build: {
        chunkSizeWarningLimit: 1000,
    },
    server: {
        watch: {
            usePolling: true,
            interval: 100,
            ignored: ["**/node_modules/**", "**/.git/**"],
        },
    },
});
