import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  resolve: { alias: [{ find: "@", replacement: fileURLToPath(new URL("./src", import.meta.url)) }] },
});
