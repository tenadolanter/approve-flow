import exampleVite from "./example.vite.js";
import libVite from "./lib.vite.js";
export default (env) => {
  const { VITE_CLI_TYPE } = env || {};
  if(VITE_CLI_TYPE === "example") {
    return exampleVite();
  }
  if(VITE_CLI_TYPE === "lib") {
    return libVite();
  }
}