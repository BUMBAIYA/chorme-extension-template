import { defineConfig } from "rollup";
import del from "rollup-plugin-delete";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import alias from "@rollup/plugin-alias";
import postcss from "rollup-plugin-postcss";
import cssnano from "cssnano";
import { minify } from "html-minifier-terser";
import copy from "rollup-plugin-copy";
import progress from "rollup-plugin-progress";

import path from "path";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(filename);

const isProduction = process.env.NODE_ENV === "production";

export default defineConfig(async () => ({
  input: {
    "background-worker": "src/background-worker.ts",
    "popup-script": "src/pages/popup/popup-script.ts",
    "content-script": "src/pages/content/content-script.ts",
  },
  output: {
    dir: "build",
    entryFileNames: "[name].js",
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
    commonjs(),
    typescript(),
    alias({
      entries: [
        {
          find: "@",
          replacement: path.resolve(__dirname, "src"),
        },
      ],
    }),
    postcss({
      extract: true,
      minimize: isProduction,
      plugins: [cssnano()],
    }),
    isProduction && (await import("@rollup/plugin-terser")).default(),
    copy({
      targets: [
        copyFile("manifest.json", "build"),
        copyFile("src/assets/*", "build/assets"),
        copyFile("src/pages/popup/popup.html", "build"),
        copyFile("src/pages/popup/popup.css", "build"),
        copyFile("src/pages/content/content.css", "build"),
      ],
    }),
    progress({
      clearLine: false,
    }),
  ],
}));

const copyFile = (src, dest) => {
  const ext = src.split(".").pop();
  switch (ext) {
    case "html": {
      return {
        src,
        dest,
        transform: isProduction
          ? (contents) =>
              minify(contents.toString(), {
                removeComments: true,
                collapseWhitespace: true,
                minifyCSS: true,
                minifyJS: true,
              })
          : undefined,
      };
    }
    case "css": {
      return {
        src,
        dest,
        transform: isProduction
          ? (contents) =>
              cssnano()
                .process(contents.toString())
                .then((result) => result.css)
          : undefined,
      };
    }
    default: {
      return {
        src,
        dest,
      };
    }
  }
};
