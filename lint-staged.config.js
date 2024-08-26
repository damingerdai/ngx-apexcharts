module.exports = {
  "src/*.ts?(x)": (filenames) =>
    filenames.length > 10
      ? "ng lint ngx-apexcharts-demo --fix"
      : `eslint --format stylish ${filenames.join(" ")} --fix`,
  "projects/ngx-apexcharts/*.ts?(x)": (filenames) =>
    filenames.length > 10
      ? "ng lint ngx-apexcharts"
      : `eslint --format stylish ${filenames.join(" ")} --fix`,
  "projects/ngx-apexcharts/*.ts?(x)": (filenames) =>
    filenames.length > 10
      ? "ng lint dev-app"
      : `eslint --format stylish ${filenames.join(" ")} --fix`,
};
