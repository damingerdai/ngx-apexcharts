import { Rule, SchematicContext, Tree } from "@angular-devkit/schematics";
import {
  NodePackageInstallTask,
  RunSchematicTask,
} from "@angular-devkit/schematics/tasks";
import { NgxApexchartNgAddSchema } from "./schema";
import { addPackageToPackageJson } from "../utils";

export default function (options: NgxApexchartNgAddSchema): Rule {
  return async (_host: Tree, _context: SchematicContext) => {
    addPackageToPackageJson(_host, "apexcharts", "~3.45.0");
    const installTaskId = _context.addTask(new NodePackageInstallTask());
    _context.addTask(new RunSchematicTask("ng-add-setup-project", options), [
      installTaskId,
    ]);
    _context.logger.log("info", '✅️ Added "ngx-apexcharts"');
  };
}
