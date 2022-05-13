import css from "rollup-plugin-import-css";
import multi from "@rollup/plugin-multi-entry";

export default {
  input: ["src/index.js"],
  output: { file: "dist/index.js", format: "esm" },
  plugins: [css(), multi()],
};
