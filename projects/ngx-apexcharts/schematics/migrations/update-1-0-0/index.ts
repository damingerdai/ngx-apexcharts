import type { Rule } from '@angular-devkit/schematics';
import { chain } from '@angular-devkit/schematics';
import { updateDependencies } from '../utils/dependencies';
import { apexchartsVersion } from '../../version';

export default function migration(): Rule {
  return chain([
    updateDependencies([
      {
        packageName: 'apexcharts',
        version: apexchartsVersion,
      },
    ]),
  ]);
}
