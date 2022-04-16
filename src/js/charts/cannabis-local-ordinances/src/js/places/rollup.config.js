import css from "rollup-plugin-import-css";
import multi from "@rollup/plugin-multi-entry";

export default {
  input: ["src/index.js", "src/w3-combobox/combobox-1.0-list.js"],
  output: { file: "dist/index.js", format: "esm" },
  plugins: [css(), multi()],
};
