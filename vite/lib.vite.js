
import Vue from "@vitejs/plugin-vue2";
import commonjs from "vite-plugin-commonjs";
import { resolve } from "path";
export default () => {
  return {
    build: {
      lib: {
        entry: resolve(__dirname, '../src/index.js'),
        name: 'automateFlow',
        fileName: 'index',
      },
      outDir: "lib",
      rollupOptions: {
        external: ['vue'],
      }
    },
    plugins: [
      Vue(),
      commonjs(),
    ],
    resolve: {
      alias: {
        "@src": resolve("./src"),
      },
    },
  };
};
