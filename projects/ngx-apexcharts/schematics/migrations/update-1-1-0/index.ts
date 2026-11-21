import type { Rule, Tree } from '@angular-devkit/schematics';

const oldModuleSpecifier = 'ngx-apexcharts/signals';
const newModuleSpecifier = 'ngx-apexcharts';

export default function migration(): Rule {
  return (tree: Tree) => {
    tree.visit((filePath) => {
      if (!isApplicationFile(filePath)) {
        return;
      }

      const file = tree.read(filePath);

      if (!file) {
        return;
      }

      const content = file.toString();

      if (!content.includes(oldModuleSpecifier)) {
        return;
      }

      tree.overwrite(
        filePath,
        content.split(oldModuleSpecifier).join(newModuleSpecifier),
      );
    });
  };
}

function isApplicationFile(filePath: string): boolean {
  // Migrations run against a tree that also contains installed dependencies.
  // Rewriting files in node_modules (including this migration's own compiled
  // output, which contains the legacy specifier as a literal) is never wanted.
  if (filePath.split('/').includes('node_modules')) {
    return false;
  }

  return /\.(?:c|m)?(?:j|t)sx?$/.test(filePath) || filePath.endsWith('.json');
}
