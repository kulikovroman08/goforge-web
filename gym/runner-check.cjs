// Offline integration check for the browser source assembler.
// Run: node gym/runner-check.cjs
'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const vm = require('vm');
const child = require('child_process');
const runner = require('./runner.js');
const baseDir = __dirname;
const source = fs.readFileSync(path.join(baseDir, 'practice/kata.go'), 'utf8');
const tests = fs.readFileSync(path.join(baseDir, 'practice/kata_test.go'), 'utf8');
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(baseDir, 'catalog.js'), 'utf8'), context);
const catalog = context.window.GOFORGE_GYM_CATALOG;
const app = fs.readFileSync(path.join(baseDir, 'app.js'), 'utf8');
const namesMatch = app.match(/const testNames=([^\n]+);/);
if (!namesMatch) throw new Error('Cannot discover per-task Go test names');
const testNames = JSON.parse(namesMatch[1]);
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'goforge-browser-'));
const failures = [];
try {
  for (const task of catalog) {
    const testName = testNames[task.id];
    if (!testName) throw new Error('Missing test name: ' + task.id);
    const archive = runner.buildSource(task, task.starter, testName, source, tests);
    const parts = archive.split(/^-- (solution(?:_test)?\.go) --\n/gm);
    if (parts.length !== 5) throw new Error('Invalid txtar sections for ' + task.id);
    fs.writeFileSync(path.join(temp, parts[1]), parts[2]);
    fs.writeFileSync(path.join(temp, parts[3]), parts[4]);
    // All 30 starter programs must compile. The tests intentionally fail
    // until the developer solves the exercise.
    try {
      child.execFileSync('go', ['test', '-run', '^$', '.'], {
        cwd: temp,
        env: Object.assign({}, process.env, { GO111MODULE: 'off' }),
        stdio: 'pipe',
        timeout: 90000,
      });
      process.stdout.write('OK  ' + task.id + '\n');
    } catch (error) {
      failures.push({ task: task.id, error: String(error.stderr || error.message).slice(0, 1400) });
      process.stderr.write('FAIL ' + task.id + '\n');
    }
  }
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}
if (failures.length) {
  for (const issue of failures) console.error(issue.task + ': ' + issue.error);
  process.exitCode = 1;
}
