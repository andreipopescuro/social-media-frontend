import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ["framer-motion"],
      output: {
        globals: {
          "framer-motion": "framer-motion",
        },
      },
    },
  },
  esbuild: {
    jsxInject: `import { css } from '@emotion/react';`,
  },
});
