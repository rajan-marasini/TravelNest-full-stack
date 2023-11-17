import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
    server: {
        proxy: {
            "/api": {
                target: "http://localhost:8000",
                secure: false,
            },
        },
    },
    plugins: [react()],
});
