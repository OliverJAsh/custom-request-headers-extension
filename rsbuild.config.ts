import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
  source: {
    entry: {
      panel: "./src/panel.tsx",
      devtools: "./src/devtools.ts",
      background: "./src/background.ts",
    },
  },
  output: {
    filenameHash: false,
  },
  plugins: [pluginReact()],
});
