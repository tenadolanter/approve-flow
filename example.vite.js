import VitePluginMd from "./build/vite-plugin-md/index.js";
import Vue from "@vitejs/plugin-vue2";
import commonjs from "vite-plugin-commonjs";
import { resolve } from "path";
export default () => {
  return {
    base: './',
    build: {
      outDir: "dist",
      rollupOptions: {
        input: resolve(__dirname, 'index.html'),
        plugins: [commonjs()],
      },
      target: "es2015",
    },
    plugins: [
      VitePluginMd(),
      Vue({ include: [/(\.vue)$/, /\.md$/] }),
    ],
    resolve: {
      alias: {
        "@src": resolve("./src"),
        "@examples": resolve("./examples"),
      },
    },
  };
};
