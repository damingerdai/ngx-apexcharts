import { Path } from '@angular-devkit/core';
import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';
import { ProjectDefinition, WorkspaceDefinition, getWorkspace } from '@schematics/angular/utility/workspace';
import { SchematicsException } from '@angular-devkit/schematics';
import { addSymbolToNgModuleMetadata, insertImport } from '@schematics/angular/utility/ast-utils';
import { ProjectType } from '@schematics/angular/utility/workspace-models';
import { InsertChange } from '@schematics/angular/utility/change';

import * as ts from '@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript';

interface NgxApexchartNgAddSchema {
  project?: string;
}

export default function(options: NgxApexchartNgAddSchema): Rule {
  return async (_host: Tree, _context: SchematicContext) => {
    const workspace = await getWorkspace(_host);
    const project = getProjectFromWorkspace(workspace, options.project);

    if (!project) {
      throw new Error(`can not find ${options.project} angular project`);
    }
    if (project.extensions.projectType === ProjectType.Application) {
      addNgxApexchartsModule(project as ProjectDefinition, _host);
      // addRootImport(options.project,({ code, external}) => {
      //   return code`${external('NgxApexchartsModule', 'ngx-apexcharts')}`
      // });
    }
    // addPackageToPackageJson(_host, 'ngx-apexcharts', '~0.3.0');
    addPackageToPackageJson(_host, 'apexcharts', '~3.44.0');
    _context.logger.log('info', '✅️ Added "ngx-apexcharts"');
    _context.addTask(new NodePackageInstallTask());
  };
}

function addNgxApexchartsModule(project: ProjectDefinition, _host: Tree): void {
  if (!project) {
    return;
  }
  const appModulePath = getAppModulePath(_host, getProjectMainFile(project));
  const sourceFile = readIntoSourceFile(_host, appModulePath);
  const importPath = 'ngx-apexcharts';
  const recorder = _host.beginUpdate(appModulePath);
  const moduleName = 'NgxApexchartsModule';
  const importChange = insertImport(sourceFile, appModulePath, moduleName, importPath);
  if (importChange instanceof InsertChange) {
    recorder.insertLeft(importChange.pos, importChange.toAdd);
  }
  const ngModuleName = 'NgxApexchartsModule';
  const ngModuleChanges = addSymbolToNgModuleMetadata(sourceFile, appModulePath, 'imports', ngModuleName, null);
  for (const change of ngModuleChanges) {
    if (change instanceof InsertChange) {
      recorder.insertLeft(change.pos, change.toAdd);
    }
  }
  _host.commitUpdate(recorder);
}


function readIntoSourceFile(host: Tree, modulePath: string): ts.SourceFile {
  const text = host.read(modulePath);
  if (text === null) {
    throw new SchematicsException(`File ${modulePath} does noot exist`);
  }

  const sourceText = text.toString('utf-8');
  return ts.createSourceFile(modulePath, sourceText, ts.ScriptTarget.Latest, true);
}

function addPackageToPackageJson(host: Tree, pkg: string, version: string): Tree {
  if (host.exists('package.json')) {
    const sourceText = host.read('package.json')!.toString('utf-8');


    const json = JSON.parse(sourceText);

    if (!json.dependencies) {
      json.dependencies = {};
    }

    if (!json.dependencies[pkg]) {
      json.dependencies[pkg] = version;
      json.dependencies = sortObjectByKeys(json.dependencies);
    }

    host.overwrite('package.json', JSON.stringify(json, null, 2));
  }

  return host;
}

function sortObjectByKeys(obj: any): any {
  return Object.keys(obj)
    .sort()
    .reduce((result: any, key: any) => (result[key] = obj[key]) && result, {});
}

// eslint-disable-next-line
function getProjectTargetOptions(project: ProjectDefinition, buildTarget: string) {
  if (project?.targets?.get(buildTarget)?.options) {
    return project!.targets!.get(buildTarget)!.options;
  }

  throw new Error(`Cannot determine project target configuration for: ${buildTarget}.`);
}

function getProjectMainFile(project: ProjectDefinition): string {
  const buildOptions = getProjectTargetOptions(project, 'build');
  if (!buildOptions) {
    throw new SchematicsException(
      `Could not find the project main file inside of the ` +
        `workspace config (${project.sourceRoot})`,
    );
  }
  // `browser` is for the `@angular-devkit/build-angular:application` builder while
  // `main` is for the `@angular-devkit/build-angular:browser` builder.
  const mainPath = (buildOptions['browser'] || buildOptions['main']) as Path | undefined;

  if (!mainPath) {
    throw new SchematicsException(
      `Could not find the project main file inside of the ` +
        `workspace config (${project.sourceRoot})`,
    );
  }

  return mainPath;
}

export function getProjectFromWorkspace(
  workspace: WorkspaceDefinition,
  projectName: string | undefined,
): ProjectDefinition {
  if (!projectName) {
    // TODO(crisbeto): some schematics APIs have the project name as optional so for now it's
    // simpler to allow undefined and checking it at runtime. Eventually we should clean this up.
    throw new SchematicsException('Project name is required.');
  }

  const project = workspace.projects.get(projectName);

  if (!project) {
    throw new SchematicsException(`Could not find project in workspace: ${projectName}`);
  }

  return project;
}
