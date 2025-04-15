import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
  source: {
    entry: {
      popup: "./src/popup.tsx",
      background: "./src/background.ts",
    },
  },
  output: {
    filenameHash: false,
  },
  plugins: [pluginReact()],
});
