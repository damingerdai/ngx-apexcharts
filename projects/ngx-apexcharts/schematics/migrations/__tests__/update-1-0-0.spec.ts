import "jasmine";
import { Tree } from "@angular-devkit/schematics";
import {
  SchematicTestRunner,
  UnitTestTree,
} from "@angular-devkit/schematics/testing";
import * as path from "path";
import { apexchartsVersion } from "../../version";

interface PackageJson {
  dependencies?: Record<string, string>;
}

describe("migration to v1.0.0", () => {
  const migrationPath = path.join(__dirname, "../../migrations.json");
  const runner = new SchematicTestRunner("migrations", migrationPath);

  it("should update apexcharts version in package.json", async () => {
    const tree = new UnitTestTree(Tree.empty());
    tree.create(
      "/package.json",
      JSON.stringify({
        dependencies: {
          apexcharts: "5.3.0",
          "ngx-apexcharts": "0.10.0",
        },
      }),
    );

    const updatedTree = await runner.runSchematic("update-1-0-0", {}, tree);
    const packageJson = JSON.parse(
      updatedTree.readContent("/package.json"),
    ) as PackageJson;

    expect(packageJson.dependencies?.["apexcharts"]).toBe(apexchartsVersion);
    expect(runner.tasks.some((task) => task.name === "node-package")).toBe(
      true,
    );
  });
});
