const assert = require('assert');
const { execFileSync } = require('child_process');
const fs = require('fs');
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
assert.match(listOutput, /deep-code-review/);
assert.match(listOutput, /bugfix/);
assert.match(listOutput, /feature-dev/);
assert.match(listOutput, /performance-testing/);
assert.match(listOutput, /refactoring/);

const deepCodeReviewSkill = fs.readFileSync(
  path.join(repoRoot, 'skills', 'deep-code-review', 'SKILL.md'),
  'utf8',
);
assert.match(deepCodeReviewSkill, /\.agents\/reviews\/deep-code-review\/\<review-id\>\.md/);
assert.match(deepCodeReviewSkill, /only permitted write is the final synthesized report/);

const performanceTestingSkill = fs.readFileSync(
  path.join(repoRoot, 'skills', 'performance-testing', 'SKILL.md'),
  'utf8',
);
assert.match(performanceTestingSkill, /do not immediately discard it, switch implementations, or roll it back/i);
assert.match(performanceTestingSkill, /performance-log-template\.md/);
assert.match(performanceTestingSkill, /regression-analysis\.md/);
assert.match(performanceTestingSkill, /Do not write runtime logs inside the installed skill directory/);

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

const deepCodeReviewDryRunOutput = run('node', [
  'bin/cli.js',
  'install',
  'deep-code-review',
  '--lang',
  'en',
  '--agent',
  'codex',
  '--dry-run',
]);
assert.match(deepCodeReviewDryRunOutput, /\[SUCCESS\] Installed "deep-code-review"/);
assert.match(deepCodeReviewDryRunOutput, /Copy: finding-verification\.md -> finding-verification\.md/);
assert.doesNotMatch(deepCodeReviewDryRunOutput, /examples|evals|scripts/);

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

const performanceTestingKoDryRunOutput = run('node', [
  'bin/cli.js',
  'install',
  'performance-testing',
  '--lang',
  'ko',
  '--agent',
  'codex',
  '--dry-run',
]);
assert.match(performanceTestingKoDryRunOutput, /\[SUCCESS\] Installed "performance-testing"/);
assert.match(performanceTestingKoDryRunOutput, /Copy: SKILL\.ko\.md -> SKILL\.md/);
assert.match(performanceTestingKoDryRunOutput, /Copy: performance-log-template\.ko\.md -> performance-log-template\.md/);
assert.match(performanceTestingKoDryRunOutput, /Copy: regression-analysis\.ko\.md -> regression-analysis\.md/);
assert.doesNotMatch(performanceTestingKoDryRunOutput, /SKILL\.zh\.md|README\.zh\.md/);

const evalOutput = run('python3', [
  'skills/ultra-grill-me/evals/check_evals.py',
  '--run-mock',
]);
assert.match(evalOutput, /Mock Test Result: 17\/17 cases passed/);

console.log('CLI smoke tests passed');
