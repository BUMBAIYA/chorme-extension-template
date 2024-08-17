import { defineConfig } from "rollup";
import del from "rollup-plugin-delete";
import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import alias from "@rollup/plugin-alias";
import { minify } from "html-minifier-terser";
import copy from "rollup-plugin-copy";
import progress from "rollup-plugin-progress";

import path from "path";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(filename);

const isProduction = process.env.NODE_ENV === "production";

export default defineConfig(async () => ({
  input: "src/background-worker.ts",
  output: {
    file: "build/background-worker.js",
    format: "cjs",
    sourcemap: isProduction,
  },
  plugins: [
    del({
      targets: "build/*",
    }),
    nodeResolve({
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    }),
    typescript(),
    alias({
      entries: [
        {
          find: "@",
          replacement: path.resolve(__dirname, "src"),
        },
      ],
    }),
    isProduction && (await import("@rollup/plugin-terser")).default(),
    copy({
      targets: [
        {
          src: "manifest.json",
          dest: "build",
        },
        {
          src: "src/assets/*",
          dest: "build/assets",
        },
        {
          src: "src/popup/popup.html",
          dest: "build",
          transform: isProduction
            ? (contents) =>
                minify(contents.toString(), {
                  removeComments: true,
                  collapseWhitespace: true,
                  minifyCSS: true,
                  minifyJS: true,
                })
            : undefined,
        },
      ],
    }),
    progress({
      clearLine: false,
    }),
  ],
}));
