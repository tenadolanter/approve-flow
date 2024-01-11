import { createFilter } from "./createFilter.js";
const mdLoader = require("./vue/index.js");
export default function VitePluginMd(userOptions) {
  let config;
  const filter = createFilter(
    userOptions?.include || /\.md$/,
    userOptions?.exclude || null
  );
  return {
    name: "vite-plugin-md",
    enforce: "pre",
    configResolved(c) {
      config = { ...c };
    },
    transform(content, file) {
      if (!filter(file)) return;
      console.log("transform", file);
      return mdLoader(content, userOptions);
    },
    handleHotUpdate(ctx) {
      if (!filter(ctx.file)) return;
      const defaultRead = ctx.read;
      ctx.read = async function() {
        return mdLoader(await defaultRead(), userOptions);
      };
    },
  };
}
