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
assert.match(listOutput, /architecture/);
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
assert.match(bugfixDryRunOutput, /Copy: SKILL.md -> SKILL.md/);

const bugfixKoDryRunOutput = run('node', [
  'bin/cli.js',
  'install',
  'bugfix',
  '--lang',
  'ko',
  '--agent',
  'codex',
  '--dry-run',
]);
assert.match(bugfixKoDryRunOutput, /Copy: SKILL\.ko\.md -> SKILL\.md/);
assert.match(bugfixKoDryRunOutput, /Copy: README\.ko\.md -> README\.md/);

const defaultGlobalDryRunOutput = run('node', [
  'bin/cli.js',
  'install',
  'bugfix',
  '--lang',
  'ko',
  '--dry-run',
]);
assert.match(defaultGlobalDryRunOutput, /Target Agent: global/);
assert.match(defaultGlobalDryRunOutput, /\.agents\/skills\/bugfix/);
assert.match(defaultGlobalDryRunOutput, /\.claude\/skills\/bugfix/);
assert.match(defaultGlobalDryRunOutput, /\.cursor\/skills\/bugfix/);
assert.match(defaultGlobalDryRunOutput, /\.copilot\/skills\/bugfix/);
assert.doesNotMatch(defaultGlobalDryRunOutput, /\.gemini\/config\/skills/);

const featureDevZhDryRunOutput = run('node', [
  'bin/cli.js',
  'install',
  'feature-dev',
  '--lang',
  'zh',
  '--agent',
  'codex',
  '--dry-run',
]);
assert.match(featureDevZhDryRunOutput, /Copy: SKILL\.zh\.md -> SKILL\.md/);
assert.match(featureDevZhDryRunOutput, /Copy: README\.zh\.md -> README\.md/);

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

const refactoringKoDryRunOutput = run('node', [
  'bin/cli.js',
  'install',
  'refactoring',
  '--lang',
  'ko',
  '--agent',
  'codex',
  '--dry-run',
]);
assert.match(refactoringKoDryRunOutput, /Copy: SKILL\.ko\.md -> SKILL\.md/);
assert.match(refactoringKoDryRunOutput, /Copy: README\.ko\.md -> README\.md/);

const evalOutput = run('python3', [
  'skills/ultra-grill-me/evals/check_evals.py',
  '--run-mock',
]);
assert.match(evalOutput, /Mock Test Result: 17\/17 cases passed/);

console.log('CLI smoke tests passed');
