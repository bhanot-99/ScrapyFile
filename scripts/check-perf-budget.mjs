import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { gzipSync } from 'node:zlib';

const DIST_DIR = join(process.cwd(), 'dist');

if (!existsSync(DIST_DIR)) {
  console.error('Error: dist directory does not exist. Run "npx astro build" first.');
  process.exit(1);
}

// 1. Measure HTML
const htmlPath = join(DIST_DIR, 'index.html');
const htmlContent = readFileSync(htmlPath);
const htmlRawKb = htmlContent.length / 1024;
const htmlGzipKb = gzipSync(htmlContent).length / 1024;

// 2. Measure Initial Linked JS and Island JS
const astroDir = join(DIST_DIR, '_astro');
let cssRawBytes = 0;
let cssGzipBytes = 0;

if (existsSync(astroDir)) {
  const files = readdirSync(astroDir);
  for (const file of files) {
    const filePath = join(astroDir, file);
    const stat = statSync(filePath);
    if (!stat.isFile()) continue;

    if (file.endsWith('.css')) {
      const content = readFileSync(filePath);
      cssRawBytes += content.length;
      cssGzipBytes += gzipSync(content).length;
    }
  }
}

// Initial linked JS on homepage (<script src="..."> in index.html)
const scriptMatches = [...htmlContent.toString('utf-8').matchAll(/(?:src|href)=\"\/(_astro\/[^\"]+\.js)\"/g)].map(m => m[1]);
const uniqueInitialScripts = [...new Set(scriptMatches)];

let initialJsRawBytes = 0;
let initialJsGzipBytes = 0;
for (const s of uniqueInitialScripts) {
  const filePath = join(DIST_DIR, s);
  if (existsSync(filePath)) {
    const content = readFileSync(filePath);
    initialJsRawBytes += content.length;
    initialJsGzipBytes += gzipSync(content).length;
  }
}

const cssRawKb = cssRawBytes / 1024;
const cssGzipKb = cssGzipBytes / 1024;
const initialJsRawKb = initialJsRawBytes / 1024;
const initialJsGzipKb = initialJsGzipBytes / 1024;

// 3. Measure Fonts in dist/fonts
const fontsDir = join(DIST_DIR, 'fonts');
let fontTotalBytes = 0;
if (existsSync(fontsDir)) {
  const fontFiles = readdirSync(fontsDir);
  for (const f of fontFiles) {
    fontTotalBytes += statSync(join(fontsDir, f)).size;
  }
}
const fontTotalKb = fontTotalBytes / 1024;

// Budgets
const budgets = [
  {
    metric: 'Initial Linked JS (gzip)',
    actual: initialJsGzipKb,
    budget: 100,
    unit: 'KB',
    passed: initialJsGzipKb < 100
  },
  {
    metric: 'Total Fonts Payload',
    actual: fontTotalKb,
    budget: 100,
    unit: 'KB',
    passed: fontTotalKb < 100
  },
  {
    metric: 'Homepage Gzipped CSS',
    actual: cssGzipKb,
    budget: 50,
    unit: 'KB',
    passed: cssGzipKb < 50
  },
  {
    metric: 'Homepage Gzipped HTML',
    actual: htmlGzipKb,
    budget: 40,
    unit: 'KB',
    passed: htmlGzipKb < 40
  }
];

console.log('\n========================================');
console.log('       PERFORMANCE BUDGET CHECK         ');
console.log('========================================');
console.log(
  'Metric'.padEnd(25) +
  'Actual'.padStart(12) +
  'Budget'.padStart(12) +
  'Status'.padStart(10)
);
console.log('-'.repeat(59));

let allPassed = true;
for (const b of budgets) {
  const statusStr = b.passed ? '✓ PASS' : '✗ FAIL';
  if (!b.passed) allPassed = false;
  console.log(
    b.metric.padEnd(25) +
    `${b.actual.toFixed(2)} ${b.unit}`.padStart(12) +
    `< ${b.budget} ${b.unit}`.padStart(12) +
    statusStr.padStart(10)
  );
}
console.log('========================================');

if (!allPassed) {
  console.error('\n❌ Performance budget check FAILED!\n');
  process.exit(1);
} else {
  console.log('\n✅ All performance budgets PASSED successfully!\n');
  process.exit(0);
}
