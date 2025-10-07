/**
 * @filename: lint-staged.config.mjs
 * @type {import('lint-staged').Configuration}
 */
export default  {
  "src/**/*.ts?(x)": (filenames) =>
    filenames.length > 10
      ? "ng lint ngx-apexcharts-demo --fix"
      : `eslint --format stylish ${filenames.join(" ")} --fix`,
  "projects/ngx-apexcharts/**/*.ts?(x)": (filenames) =>
    filenames.length > 10
      ? "ng lint ngx-apexcharts --fix"
      : `eslint --format stylish ${filenames.join(" ")} --fix`,
  "projects/dev-app/**/*.ts?(x)": (filenames) =>
    filenames.length > 10
      ? "ng lint dev-app --fix"
      : `eslint --format stylish ${filenames.join(" ")} --fix`,
};
