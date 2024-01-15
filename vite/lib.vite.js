
import Vue from "@vitejs/plugin-vue2";
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
        output: {
          globals: {
            vue: 'Vue'
          },
        },
      }
    },
    plugins: [
      Vue(),
    ],
    resolve: {
      alias: {
        "@src": resolve("./src"),
      },
    },
  };
};
