import 'jasmine';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { Schema as ApplicationOptions, Style } from '@schematics/angular/application/schema';
import { Schema as WorkspaceOtions } from '@schematics/angular/workspace/schema';
import * as path from 'path';

interface PackageJson {
  dependencies: Record<string, string>;
}

describe('ng add ngx-apexcharts', () => {
  const collectionPath = path.join(__dirname, '../../collection.json');
  const runner = new SchematicTestRunner('schematics', collectionPath);

  let appTree: UnitTestTree | undefined;

  beforeAll(async () => {
    const workspaceOptions: WorkspaceOtions = {
      name: 'workspace',
      newProjectRoot: 'projects',
      version: '1.0.0',
    };
    const appOptions: ApplicationOptions = {
      name: 'ngx-apexcharts-app',
      inlineStyle: false,
      inlineTemplate: false,
      routing: false,
      style: Style.Scss,
      skipTests: false,
      skipPackageJson: false,
      standalone: false
    };
    const appStandaloneOptions: ApplicationOptions = {
      name: 'ngx-apexcharts-standalone-app',
      inlineStyle: false,
      inlineTemplate: false,
      routing: false,
      style: Style.Scss,
      skipTests: false,
      skipPackageJson: false,
      standalone: true
    };
    appTree = await runner.runExternalSchematic('@schematics/angular', 'workspace', workspaceOptions);
    appTree = await runner.runExternalSchematic('@schematics/angular', 'application', appOptions, appTree);
    appTree = await runner.runExternalSchematic('@schematics/angular', 'application', appStandaloneOptions, appTree);
  });

  it('should add apexcharts to package.json', async () => {
    const options = { project: 'ngx-apexcharts-app' };
    const tree = await runner.runSchematic('ng-add', options, appTree);
    const packageJson = tree.readContent('/package.json');
    expect(packageJson).toContain('"apexcharts": "~3.44.0"');
  })

  it('should add ngx-apexcharts to AppModule', async () => {
    const options = { project: 'ngx-apexcharts-app' };
    const tree = await runner.runSchematic('ng-add-setup-project', options, appTree);
    const appmodule = tree.readContent('/projects/ngx-apexcharts-app/src/app/app.module.ts');
    //expect(appmodule).toContain("import { NgxApexchartsModule } from 'ngx-apexcharts'");
    //expect(appmodule).toMatch(/imports:\s*\[\s*BrowserModule,\s*NgxApexchartsModule\s*\]/);
    expect(appmodule).toMatch(/import.*NgxApexchartsModule.*from 'ngx-apexcharts'/);
    expect(appmodule).toMatch(/imports:\s*\[[^\]]+?,\r?\n\s+NgxApexchartsModule\r?\n/m)
  })
});
