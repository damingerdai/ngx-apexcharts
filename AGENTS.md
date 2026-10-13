# Repository Guidelines

## Project Structure & Module Organization

This Angular workspace provides the `ngx-apexcharts` wrapper for ApexCharts.
- `projects/ngx-apexcharts/src/lib/`: chart component, module, and chart types; expose supported APIs through `src/public_api.ts` within the library.
- `projects/ngx-apexcharts/schematics/`: installation and migration tooling, with installation tests in `ng-add/__tests__/`.
- `projects/dev-app/`: development playground; `projects/docs-app/`: documentation application, with static assets in `public/`.
- `src/`: older demo application. `docs/guide.md` supplies documentation content; `tools/` contains documentation and type-generation utilities.
- `dist/`: generated build output; keep source changes in the corresponding project directories.

## Build, Test, and Development Commands

Use Node.js 24 to match CI. Install dependencies with `npm ci --legacy-peer-deps`.

- `npm start`: serve the development app on port 4201.
- `npm run build-docs-content && npx ng serve docs-app`: generate documentation content and serve the docs app.
- `npm run build-pkg`: build the Angular library.
- `npm run package`: build the library and compile schematics.
- `npm run build`: build the development and documentation apps.
- `npm run lint`: lint all four projects; `npm run lint:fix` applies automatic fixes.
- `npm run test-schematics`: run schematic tests.
- `npm run test:ci`: run headless library tests with coverage, then schematic tests; requires Chrome.

## Coding Style & Naming Conventions

Follow `.editorconfig`: two-space indentation, UTF-8, final newlines, and no trailing whitespace outside Markdown. Use TypeScript and SCSS, following nearby files for quoting and layout. ESLint uses TypeScript and Angular rules, including template accessibility checks. Use descriptive filenames such as `chart.component.ts` and `series.pipe.ts`, PascalCase classes, and camelCase members. Library component selectors use `apx-`; application selectors use `app-`.

## Testing Guidelines

Library tests use Jasmine/Karma; application targets use Vitest; schematic tests use Jasmine through `tsx`. Name tests `*.spec.ts`, colocated with implementation or in schematic `__tests__/` directories. Add regression tests for behavior changes. Run application tests with `npx ng test dev-app --watch=false` or the corresponding project name. Library coverage is generated in `coverage/`; no numeric threshold is configured.

## Commit & Pull Request Guidelines

Follow Conventional Commits, as enforced by commitlint and reflected in history: `feat: ...`, `fix(schematics): ...`, or `docs: ...`. Keep commits focused. PRs should explain the change, link relevant issues, report validation, and include screenshots for visible chart or documentation changes. Before submitting, run lint, schematic tests, packaging, and application builds to match CI; run relevant component tests as well.
