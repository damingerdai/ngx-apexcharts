import type { Rule } from "@angular-devkit/schematics";
import { chain } from "@angular-devkit/schematics";
import { updateDependencies } from "../utils/dependencies";

const apexchartsVersion = "~3.45.0";

export default function migration(): Rule {
  return chain([
    updateDependencies([
      {
        packageName: "apexcharts",
        version: apexchartsVersion,
      },
    ]),
  ]);
}
