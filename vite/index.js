import exampleVite from "./example.vite.js";
export default (env) => {
  const { VITE_CLI_TYPE } = env || {};
  if(VITE_CLI_TYPE === "example") {
    return exampleVite();
  }
}