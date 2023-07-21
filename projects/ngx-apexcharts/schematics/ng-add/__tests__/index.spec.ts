import 'jasmine';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { Schema as ApplicationOptions, Style } from '@schematics/angular/application/schema';
import { Schema as WorkspaceOtions } from '@schematics/angular/workspace/schema';
import * as path from 'path';

describe('ng add ngx-apexcharts', () => {
  const collectionPath = path.join(__dirname, '../../collection.json');
  const runner = new SchematicTestRunner('schematics', collectionPath);
  const workspaceOptions: WorkspaceOtions = {
    name: 'workspace',
    newProjectRoot: 'projects',
    version: '1.0.0',
  };
  const appOptions: ApplicationOptions = {
    name: 'ngx-apexcharts',
    inlineStyle: false,
    inlineTemplate: false,
    routing: false,
    style: Style.Scss,
    skipTests: false,
    skipPackageJson: false,
  };

  let appTree: UnitTestTree | undefined;

  beforeAll(async () => {
    appTree = await runner.runExternalSchematic('@schematics/angular', 'workspace', workspaceOptions);
    appTree = await runner.runExternalSchematic('@schematics/angular', 'application', appOptions, appTree);
  });

  it('add NgxApexchartsModule in angular project', async () => {
    const options = { project: 'ngx-apexcharts' };
    const tree = await runner.runSchematic('ng-add', options, appTree);
    const appmodule = tree.readContent('/projects/ngx-apexcharts/src/app/app.module.ts');
    expect(appmodule).toContain("import { NgxApexchartsModule } from 'ngx-apexcharts'");
    expect(appmodule).toContain(`imports: [
    BrowserModule,
    NgxApexchartsModule
  ],
`);
    let packageJson = tree.readJson('package.json') as { dependencies: { apexcharts: string } };
    if (typeof packageJson === 'string') {
      packageJson = JSON.parse(packageJson);
    }
    console.log(packageJson, typeof packageJson);
    expect(packageJson.dependencies?.apexcharts).toBe('~3.36.3');
  });
});
