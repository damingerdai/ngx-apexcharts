import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    setupFiles: ['projects/ngx-apexcharts/schematics/test-setup.ts'],
    include: ['projects/ngx-apexcharts/schematics/**/*.spec.ts'],
  },
});
