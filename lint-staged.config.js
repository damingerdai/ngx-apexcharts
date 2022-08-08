module.exports = {
  "src/*.ts?(x)": (filenames) =>
    filenames.length > 10
      ? "ng lint ngx-apexcharts-demo"
      : `eslint --format stylish ${filenames.join(" ")}`,
  "projects/ngx-apexcharts/*.ts?(x)": (filenames) =>
    filenames.length > 10
      ? "ng lint ngx-apexcharts-demo"
      : `eslint --format stylish ${filenames.join(" ")}`,
};
