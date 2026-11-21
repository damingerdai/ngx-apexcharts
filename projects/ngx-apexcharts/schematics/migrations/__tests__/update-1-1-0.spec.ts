import "jasmine";
import { Tree } from "@angular-devkit/schematics";
import {
  SchematicTestRunner,
  UnitTestTree,
} from "@angular-devkit/schematics/testing";
import * as path from "path";

describe("migration to v1.1.0", () => {
  const migrationPath = path.join(__dirname, "../../migrations.json");
  const runner = new SchematicTestRunner("migrations", migrationPath);

  it("should migrate the signals module specifier in application files", async () => {
    const tree = new UnitTestTree(Tree.empty());
    tree.create(
      "/src/app/app.component.ts",
      `import { ChartComponent } from "ngx-apexcharts/signals";\n`,
    );
    tree.create(
      "/tsconfig.app.json",
      `{"paths":{"ngx-apexcharts/signals":["./src/signals"]}}`,
    );
    tree.create(
      "/src/app/README.md",
      "ngx-apexcharts/signals is mentioned in documentation.",
    );

    const updatedTree = await runner.runSchematic("update-1-1-0", {}, tree);

    expect(updatedTree.readContent("/src/app/app.component.ts")).toBe(
      `import { ChartComponent } from "ngx-apexcharts";\n`,
    );
    expect(updatedTree.readContent("/tsconfig.app.json")).toBe(
      `{"paths":{"ngx-apexcharts":["./src/signals"]}}`,
    );
    expect(updatedTree.readContent("/src/app/README.md")).toBe(
      "ngx-apexcharts/signals is mentioned in documentation.",
    );
  });

  it("should not modify files inside node_modules", async () => {
    const tree = new UnitTestTree(Tree.empty());
    const migrationSource = `const oldModuleSpecifier = "ngx-apexcharts/signals";\n`;
    const packageJson = `{"paths":{"ngx-apexcharts/signals":["./src/signals"]}}`;
    tree.create(
      "/node_modules/ngx-apexcharts/schematics/migrations/update-1-1-0/index.js",
      migrationSource,
    );
    tree.create("/node_modules/some-package/package.json", packageJson);

    const updatedTree = await runner.runSchematic("update-1-1-0", {}, tree);

    expect(
      updatedTree.readContent(
        "/node_modules/ngx-apexcharts/schematics/migrations/update-1-1-0/index.js",
      ),
    ).toBe(migrationSource);
    expect(updatedTree.readContent("/node_modules/some-package/package.json")).toBe(
      packageJson,
    );
  });

  it("should leave files without the legacy module specifier unchanged", async () => {
    const tree = new UnitTestTree(Tree.empty());
    tree.create(
      "/src/app/app.component.ts",
      `import { ChartComponent } from "ngx-apexcharts";\n`,
    );

    const updatedTree = await runner.runSchematic("update-1-1-0", {}, tree);

    expect(updatedTree.readContent("/src/app/app.component.ts")).toBe(
      `import { ChartComponent } from "ngx-apexcharts";\n`,
    );
  });
});
