import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import flowbiteReact from "flowbite-react/plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), flowbiteReact()],
  base: 'prpl-ipsum/',
  build: {
    outDir: 'docs'
  }
})