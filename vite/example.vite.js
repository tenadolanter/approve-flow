import VitePluginMd from "../build/vite-plugin-md/index.js";
import Vue from "@vitejs/plugin-vue2";
import commonjs from "vite-plugin-commonjs";
import { resolve } from "path";
export default () => {
  return {
    build: {
      rollupOptions: {
        input: "examples/main.js",
        plugins: [commonjs()],
      },
    },
    plugins: [
      VitePluginMd({ name: "1212" }),
      Vue({ include: [/(\.vue)$/, /\.md$/] }),
    ],
    resolve: {
      alias: {
        "@src": resolve("./src"),
        "@examples": resolve("./examples"),
      },
    },
    server: {
      port: "8083",
      proxy: {},
    },
  };
};
