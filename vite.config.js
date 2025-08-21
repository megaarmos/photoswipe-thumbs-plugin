import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/photoswipe-thumbs-plugin.esm.js"),
      name: "photoswipe-thumbs-plugin",
      formats: ["esm", "umd"],
      fileName: (format) => `photoswipe-thumbs-plugin.${format}.js`,
    },
  },
});
