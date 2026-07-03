const assert = require('assert');
const { execFileSync } = require('child_process');
const path = require('path');

const repoRoot = path.join(__dirname, '..');

function run(command, args) {
  return execFileSync(command, args, {
    cwd: repoRoot,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });
}

const listOutput = run('node', ['bin/cli.js', 'list', '--lang', 'ko']);
assert.match(listOutput, /ultra-grill-me/);
assert.match(listOutput, /bugfix/);
assert.match(listOutput, /feature-dev/);
assert.match(listOutput, /refactoring/);

const dryRunOutput = run('node', [
  'bin/cli.js',
  'install',
  'ultra-grill-me',
  '--lang',
  'ko',
  '--agent',
  'codex',
  '--dry-run',
]);
assert.match(dryRunOutput, /\[SUCCESS\] Installed "ultra-grill-me"/);
assert.doesNotMatch(dryRunOutput, /\.DS_Store/);

const bugfixDryRunOutput = run('node', [
  'bin/cli.js',
  'install',
  'bugfix',
  '--lang',
  'en',
  '--agent',
  'codex',
  '--dry-run',
]);
assert.match(bugfixDryRunOutput, /\[SUCCESS\] Installed "bugfix"/);
assert.doesNotMatch(bugfixDryRunOutput, /\.DS_Store/);

const refactoringDryRunOutput = run('node', [
  'bin/cli.js',
  'install',
  'refactoring',
  '--lang',
  'en',
  '--agent',
  'codex',
  '--dry-run',
]);
assert.match(refactoringDryRunOutput, /\[SUCCESS\] Installed "refactoring"/);
assert.doesNotMatch(refactoringDryRunOutput, /\.DS_Store/);

const evalOutput = run('python3', [
  'skills/ultra-grill-me/evals/check_evals.py',
  '--run-mock',
]);
assert.match(evalOutput, /Mock Test Result: 2\/2 cases passed/);

console.log('CLI smoke tests passed');
