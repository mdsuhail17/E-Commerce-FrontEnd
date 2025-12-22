import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
   build: {
    outDir: "dist",
    sourcemap: false, // code compile code is converted into a js, by this false we are saying that do try to map  compile code with the source code 
    minify: "esbuild", // removes the spaces and unwanted spaces (compile code size is reduced)
    rollupOptions: {
      // when we build inseated of single index js file, we have multiples file with bellow names like vendor, redux, router, ui (fast)
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          redux: ["@reduxjs/toolkit", "react-redux"],
          router: ["react-router-dom"],
          ui: [
            "@fortawesome/react-fontawesome",
            "@fortawesome/fontawesome-svg-core",
          ],
        },
      },
    },
  },
  base: "/",
  server: { port: 5173 }, //  server port
  preview: { port: 5173 }, // preview port how our app will look after build in production (localhost:5173)
});
