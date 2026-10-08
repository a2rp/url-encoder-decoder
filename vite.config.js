import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    base: "/url-encoder-decoder/",
    build: { sourcemap: false },
    plugins: [react()],
});
