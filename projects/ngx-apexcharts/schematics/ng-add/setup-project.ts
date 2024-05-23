import {
  chain,
  Rule,
  SchematicContext,
  Tree,
} from "@angular-devkit/schematics";
import {
  getWorkspace,
  ProjectDefinition,
} from "@schematics/angular/utility/workspace";
import { ProjectType } from "@schematics/angular/utility/workspace-models";
import {
  getAppModulePath,
  isStandaloneApp,
} from "@schematics/angular/utility/ng-ast-utils";
import { addRootImport } from "@schematics/angular/utility/standalone/rules";
import {
  addModuleImportToRootModule,
  getProjectFromWorkspace,
  getProjectMainFile,
  hasNgModuleImport,
} from "../utils";
import { NgxApexchartNgAddSchema } from "./schema";

export default function (options: NgxApexchartNgAddSchema): Rule {
  return async (host: Tree, context: SchematicContext) => {
    const workspace = await getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);

    if (project.extensions["projectType"] !== ProjectType.Application) {
      context.logger.warn(
        `project '${options.project}' is not an angular application. it look like angular library`,
      );
      return;
    }

    return chain([addNgxApexchartsModule(options)]);
  };
}

function addNgxApexchartsModule(options: NgxApexchartNgAddSchema) {
  return async (host: Tree, context: SchematicContext) => {
    const workspace = await getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);
    const mainFilePath = getProjectMainFile(project);

    if (isStandaloneApp(host, mainFilePath)) {
      addNgxApexchartsToStandaloneApp(host, mainFilePath, context, options);
    } else {
      addNgxApexchartsToNonStandaloneApp(host, project, mainFilePath, context);
    }
  };
}

function addNgxApexchartsToStandaloneApp(
  host: Tree,
  mainFile: string,
  _context: SchematicContext,
  _options: NgxApexchartNgAddSchema,
) {
  const ngxApexchartModuleoduleName = "NgxApexchartsModule";
  const libraryName = "ngx-apexcharts";
  addRootImport(
    _options.project!,
    ({ code, external }) =>
      code`${external(ngxApexchartModuleoduleName, libraryName)}`,
  );
}

function addNgxApexchartsToNonStandaloneApp(
  host: Tree,
  project: ProjectDefinition,
  mainFile: string,
  context: SchematicContext,
) {
  const ngxApexchartModuleoduleName = "NgxApexchartsModule";
  const appModulePath = getAppModulePath(host, mainFile);

  if (hasNgModuleImport(host, appModulePath, ngxApexchartModuleoduleName)) {
    context.logger.error(
      `Could not set up "${ngxApexchartModuleoduleName}" ` +
        `because "${ngxApexchartModuleoduleName}" is already imported.`,
    );
    context.logger.info(`Please manually set up browser animations.`);
  } else {
    addModuleImportToRootModule(
      host,
      ngxApexchartModuleoduleName,
      "ngx-apexcharts",
      project,
    );
  }
}
