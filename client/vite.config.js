import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
    server: {
        proxy: {
            "/api": {
                target: "https://travel-nest-full-stack.vercel.app",
                secure: false,
            },
        },
    },
    plugins: [react()],
});
