import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import babel from "@rollup/plugin-babel";
import typescript from "rollup-plugin-typescript2";
import analyze from "rollup-plugin-analyzer";

import packageJson from "./package.json";


const extensions = [".js", ".jsx", ".ts", ".tsx"];

export default {
  input: "./src/index.ts",

  // Specify here external modules which you don't want to include in your bundle (for instance: 'lodash', 'moment' etc.)
  // https://rollupjs.org/guide/en/#external
  external: [],
  exclude: ['./example'],
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve(({ extensions })),
    commonjs(),
    typescript(),
    babel({
      extensions,
      babelHelpers: "bundled",
      include: ["src/**/*"],
    }),
    analyze()
  ],
  watch: {
    buildDelay: 1000,
  }
};
