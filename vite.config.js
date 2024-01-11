import { defineConfig, loadEnv } from 'vite'
import getViteConfig from "./vite/index.js"
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return getViteConfig(env);
})