import { readFileSync, writeFileSync } from 'node:fs';
import {marked} from 'marked';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';
import { DocsMarkdownRenderer } from './docs-marked-renderer.mjs';

// Regular expression that matches the markdown extension of a given path.
const markdownExtension = /.md$/;

// Custom markdown renderer for transforming markdown files for the docs.
const markdownRenderer = new DocsMarkdownRenderer();

// Setup our custom docs renderer by default.
marked.setOptions({renderer: markdownRenderer});

const projectDir = join(dirname(fileURLToPath(import.meta.url)), '../');
const inputFiles = [join(projectDir, '../docs/guide.md')];

inputFiles.forEach(inputPath => {
  const outputPath = inputPath.replace(markdownExtension, '.html');
  const htmlOutput = markdownRenderer.finalizeOutput(
    marked.parse(readFileSync(inputPath, 'utf8'), {async: false}),
    inputPath,
  );

  writeFileSync(outputPath, htmlOutput);
});
