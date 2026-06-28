#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

// Helper to print usage info
def_usage = () => {
  console.log(`
Usage: npx skill-forge <command> [options]

Commands:
  add <skill-name>     Install a specific skill from the forge workspace.
  install-all          Install all available skills from the forge workspace.

Options:
  -l, --lang <lang>    Specify localization language (e.g., en, ko, zh). (Default: en)
  -a, --agent <agent>  Target AI Agent environment. (Default: codex)
                       Supported: codex, gemini, claude, cursor, copilot, global
  --dry-run            Simulate copying without actually modifying files.
  -h, --help           Display help message.

Examples:
  npx skill-forge add ultra-grill-me --lang ko
  npx skill-forge add ultra-grill-me --lang zh --agent claude
  npx skill-forge install-all --lang en --agent cursor
`);
};

// Simple command line arguments parser
const args = process.argv.slice(2);
if (args.length === 0 || args.includes('-h') || args.includes('--help')) {
  def_usage();
  process.exit(0);
}

const command = args[0];
if (command !== 'add' && command !== 'install-all') {
  console.error(`Error: Unknown command "${command}"`);
  def_usage();
  process.exit(1);
}

// Default Options
let targetSkill = null;
let lang = 'en';
let agent = 'codex';
let dryRun = false;

if (command === 'add') {
  targetSkill = args[1];
  if (!targetSkill || targetSkill.startsWith('-')) {
    console.error('Error: Please specify a skill name to add. (e.g., npx skill-forge add ultra-grill-me)');
    process.exit(1);
  }
}

// Parse flags
for (let i = (command === 'add' ? 2 : 1); i < args.length; i++) {
  const arg = args[i];
  if (arg === '-l' || arg === '--lang') {
    lang = args[++i];
  } else if (arg === '-a' || arg === '--agent') {
    agent = args[++i];
  } else if (arg === '--dry-run') {
    dryRun = true;
  } else {
    console.warn(`Warning: Ignored unknown flag/argument "${arg}"`);
  }
}

// Determine target path based on Agent parameter
let targetBaseDir = '';
const workspaceRoot = process.cwd();

switch (agent.toLowerCase()) {
  case 'codex':
  case 'gemini':
    targetBaseDir = path.join(workspaceRoot, '.agents', 'skills');
    break;
  case 'claude':
    targetBaseDir = path.join(workspaceRoot, '.claude', 'skills');
    break;
  case 'cursor':
    targetBaseDir = path.join(workspaceRoot, '.cursor', 'skills');
    break;
  case 'copilot':
    targetBaseDir = path.join(workspaceRoot, '.copilot', 'skills');
    break;
  case 'global':
    targetBaseDir = path.join(os.homedir(), '.gemini', 'config', 'skills');
    break;
  default:
    console.error(`Error: Unsupported agent type "${agent}".`);
    process.exit(1);
}

const sourceSkillsDir = path.join(__dirname, '..', 'skills');

// Perform the installation
if (command === 'add') {
  installSkill(targetSkill);
} else if (command === 'install-all') {
  if (!fs.existsSync(sourceSkillsDir)) {
    console.error(`Error: Skills source directory not found at ${sourceSkillsDir}`);
    process.exit(1);
  }
  const skills = fs.readdirSync(sourceSkillsDir).filter(file => {
    return fs.statSync(path.join(sourceSkillsDir, file)).isDirectory();
  });
  if (skills.length === 0) {
    console.log('No skills found in workspace to install.');
    process.exit(0);
  }
  console.log(`Installing all ${skills.length} skills to target path: ${targetBaseDir}...\n`);
  skills.forEach(skill => {
    installSkill(skill);
  });
}

/**
 * Installs a single skill with translation mapping logic
 */
function installSkill(skillName) {
  const sourceDir = path.join(sourceSkillsDir, skillName);
  const destDir = path.join(targetBaseDir, skillName);

  if (!fs.existsSync(sourceDir)) {
    console.error(`Error: Skill "${skillName}" does not exist in source path: ${sourceDir}`);
    // If it's a single add, we terminate; if install-all, we skip
    if (command === 'add') process.exit(1);
    return;
  }

  console.log(`[INSTALLING] Skill "${skillName}" (Language: ${lang}, Target Agent: ${agent})`);
  if (dryRun) console.log('  *** DRY-RUN MODE: No files will be modified ***');

  // Helper to recursively copy directories with translation renaming rules
  function copyRecursive(src, dest) {
    if (!fs.existsSync(src)) return;
    const stats = fs.statSync(src);

    if (stats.isDirectory()) {
      if (!fs.existsSync(dest) && !dryRun) {
        fs.mkdirSync(dest, { recursive: true });
      }
      const files = fs.readdirSync(src);
      
      // We will perform mapping logic here.
      // E.g., if lang = 'ko', and we have:
      // - SKILL.ko.md
      // - SKILL.md
      // We want to skip SKILL.md, and copy SKILL.ko.md as dest/SKILL.md.
      
      const fileMappings = [];
      const filesToSkip = new Set();

      // First pass: identify translations and original equivalents
      files.forEach(file => {
        const filePath = path.join(src, file);
        if (fs.statSync(filePath).isDirectory()) {
          // Directories are directly handled recursively
          return;
        }

        const ext = path.extname(file); // .md, .py, etc.
        const base = path.basename(file, ext); // SKILL.ko, SKILL, etc.

        // Check if this file is a translation for the selected language
        // Pattern: fileName.<langCode>.md (e.g. SKILL.ko.md, product-idea-grill.ko.md)
        const langSuffix = `.${lang}`;
        if (base.endsWith(langSuffix)) {
          const originalBaseName = base.slice(0, -langSuffix.length);
          const originalFileName = originalBaseName + ext;

          // Map this translation to the original destination name
          fileMappings.push({
            srcFile: file,
            destFile: originalFileName,
            isTranslation: true
          });

          // Mark the original default file to be skipped from regular copying
          // because we are overwriting it with the translation.
          if (files.includes(originalFileName)) {
            filesToSkip.add(originalFileName);
          }
        }
      });

      // Second pass: perform actual copy logic
      files.forEach(file => {
        const srcPath = path.join(src, file);
        const destPath = path.join(dest, file);

        if (fs.statSync(srcPath).isDirectory()) {
          copyRecursive(srcPath, destPath);
          return;
        }

        // If this is the original file that has been translated, skip it
        if (filesToSkip.has(file)) {
          return;
        }

        // Check if this file is a translation for OTHER languages (not selected)
        // If so, we skip it entirely so target stays clean.
        const ext = path.extname(file);
        const base = path.basename(file, ext);
        const langMatch = base.match(/\.([a-z]{2})$/);
        if (langMatch) {
          const matchedLang = langMatch[1];
          if (matchedLang !== lang) {
            // This is a translation for another language (e.g., zh when we selected ko), skip
            return;
          }
        }

        // If this file was already mapped to overwrite the original, handle it
        const mapping = fileMappings.find(m => m.srcFile === file);
        if (mapping) {
          const mappedDestPath = path.join(dest, mapping.destFile);
          console.log(`  Copy: ${file} -> ${mapping.destFile}`);
          if (!dryRun) {
            fs.copyFileSync(srcPath, mappedDestPath);
          }
          return;
        }

        // Regular file copy
        console.log(`  Copy: ${file} -> ${file}`);
        if (!dryRun) {
          fs.copyFileSync(srcPath, destPath);
        }
      });

    } else {
      // Single file handling
      console.log(`  Copy: ${path.basename(src)} -> ${path.basename(dest)}`);
      if (!dryRun) {
        fs.copyFileSync(src, dest);
      }
    }
  }

  copyRecursive(sourceDir, destDir);
  console.log(`[SUCCESS] Installed "${skillName}" to: ${destDir}\n`);
}
