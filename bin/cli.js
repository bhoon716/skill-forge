#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const readline = require('readline');

const sourceSkillsDir = path.join(__dirname, '..', 'skills');

// Helper to print usage info
const def_usage = () => {
  console.log(`
Usage: npx @bhoon716/skill-forge [command] [options]

If run without arguments, launches Interactive Setup Mode.

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
  npx @bhoon716/skill-forge add ultra-grill-me --lang ko
  npx @bhoon716/skill-forge add ultra-grill-me --lang zh --agent claude
`);
};

// Autodetect agent paths in current working directory
const detectAgents = () => {
  const detected = [];
  const pwd = process.cwd();
  if (fs.existsSync(path.join(pwd, '.agents'))) detected.push({ name: 'codex/gemini', value: 'codex' });
  if (fs.existsSync(path.join(pwd, '.claude'))) detected.push({ name: 'claude', value: 'claude' });
  if (fs.existsSync(path.join(pwd, '.cursor'))) detected.push({ name: 'cursor', value: 'cursor' });
  if (fs.existsSync(path.join(pwd, '.copilot'))) detected.push({ name: 'copilot', value: 'copilot' });
  return detected;
};

// Interactive Mode Prompt
const runInteractiveMode = async () => {
  console.log('===================================================');
  console.log('🛠️  Welcome to skill-forge Interactive Setup Mode');
  console.log('===================================================\n');

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

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const question = (query) => new Promise((resolve) => rl.question(query, resolve));

  try {
    // 1. Select Skill
    console.log('Available Skills in Forge:');
    skills.forEach((s, idx) => console.log(`  [${idx + 1}] ${s}`));
    console.log(`  [${skills.length + 1}] (Install All Available Skills)`);
    
    let skillChoiceIdx = -1;
    while (true) {
      const ans = await question(`\nSelect a skill to install [1-${skills.length + 1}]: `);
      const val = parseInt(ans.trim());
      if (val >= 1 && val <= skills.length + 1) {
        skillChoiceIdx = val - 1;
        break;
      }
      console.log('Invalid choice. Please select a valid option number.');
    }

    const installAll = skillChoiceIdx === skills.length;
    const selectedSkill = installAll ? null : skills[skillChoiceIdx];

    // 2. Select Language
    console.log('\nSelect localization language:');
    console.log('  [1] English (en) - Default');
    console.log('  [2] 한국어 (ko)');
    console.log('  [3] 简体中文 (zh)');
    
    let selectedLang = 'en';
    while (true) {
      const ans = await question('\nSelect language option [1-3, Default 1]: ');
      const val = ans.trim();
      if (val === '' || val === '1') {
        selectedLang = 'en';
        break;
      } else if (val === '2') {
        selectedLang = 'ko';
        break;
      } else if (val === '3') {
        selectedLang = 'zh';
        break;
      }
      console.log('Invalid choice. Please select 1, 2, or 3.');
    }

    // 3. Select Agent Target
    const detected = detectAgents();
    console.log('\nSelect target AI Agent environment:');
    
    const agentsList = [
      { name: 'Codex / Gemini (./.agents/)', value: 'codex' },
      { name: 'Claude Code (./.claude/)', value: 'claude' },
      { name: 'Cursor (./.cursor/)', value: 'cursor' },
      { name: 'Github Copilot (./.copilot/)', value: 'copilot' },
      { name: 'Global User Setting (~/.gemini/config/)', value: 'global' }
    ];

    agentsList.forEach((ag, idx) => {
      const isDetected = detected.some(d => d.value === ag.value);
      const label = isDetected ? '⭐ (Detected in Project)' : '';
      console.log(`  [${idx + 1}] ${ag.name} ${label}`);
    });

    let selectedAgent = 'codex';
    while (true) {
      const ans = await question('\nSelect agent option [1-5, Default 1]: ');
      const val = ans.trim();
      if (val === '') {
        selectedAgent = 'codex';
        break;
      }
      const idx = parseInt(val);
      if (idx >= 1 && idx <= 5) {
        selectedAgent = agentsList[idx - 1].value;
        break;
      }
      console.log('Invalid choice. Please select a option number between 1 and 5.');
    }

    rl.close();

    // Summary and Execute
    console.log('\n---------------------------------------------------');
    console.log('🚀 Ready to install:');
    console.log(`   - Skill: ${installAll ? 'ALL Skills' : selectedSkill}`);
    console.log(`   - Language: ${selectedLang}`);
    console.log(`   - Target Agent: ${selectedAgent}`);
    console.log('---------------------------------------------------\n');

    // Run installation logic
    const targetBaseDir = getTargetBaseDir(selectedAgent);
    if (installAll) {
      console.log(`Installing all ${skills.length} skills to target path: ${targetBaseDir}...\n`);
      skills.forEach(s => installSkillLogic(s, selectedLang, selectedAgent, targetBaseDir));
    } else {
      installSkillLogic(selectedSkill, selectedLang, selectedAgent, targetBaseDir);
    }

  } catch (err) {
    console.error('Error during interactive setup:', err);
    rl.close();
    process.exit(1);
  }
};

const getTargetBaseDir = (selectedAgent) => {
  const pwd = process.cwd();
  switch (selectedAgent.toLowerCase()) {
    case 'codex':
    case 'gemini':
      return path.join(pwd, '.agents', 'skills');
    case 'claude':
      return path.join(pwd, '.claude', 'skills');
    case 'cursor':
      return path.join(pwd, '.cursor', 'skills');
    case 'copilot':
      return path.join(pwd, '.copilot', 'skills');
    case 'global':
      return path.join(os.homedir(), '.gemini', 'config', 'skills');
    default:
      console.error(`Error: Unsupported agent type "${selectedAgent}".`);
      process.exit(1);
  }
};

// Main Entry Point Parsing
const args = process.argv.slice(2);

if (args.includes('-h') || args.includes('--help')) {
  def_usage();
  process.exit(0);
}

// If no arguments, launch Interactive Mode
if (args.length === 0) {
  runInteractiveMode();
} else {
  // Command line parameters parsing mode
  const command = args[0];
  if (command !== 'add' && command !== 'install-all') {
    console.error(`Error: Unknown command "${command}"`);
    def_usage();
    process.exit(1);
  }

  let targetSkill = null;
  let lang = 'en';
  let agent = 'codex';
  let dryRun = false;

  if (command === 'add') {
    targetSkill = args[1];
    if (!targetSkill || targetSkill.startsWith('-')) {
      console.error('Error: Please specify a skill name to add.');
      process.exit(1);
    }
  }

  for (let i = (command === 'add' ? 2 : 1); i < args.length; i++) {
    const arg = args[i];
    if (arg === '-l' || arg === '--lang') {
      lang = args[++i];
    } else if (arg === '-a' || arg === '--agent') {
      agent = args[++i];
    } else if (arg === '--dry-run') {
      dryRun = true;
    }
  }

  const targetBaseDir = getTargetBaseDir(agent);

  if (command === 'add') {
    installSkillLogic(targetSkill, lang, agent, targetBaseDir, dryRun);
  } else if (command === 'install-all') {
    if (!fs.existsSync(sourceSkillsDir)) {
      console.error(`Error: Skills source directory not found at ${sourceSkillsDir}`);
      process.exit(1);
    }
    const skills = fs.readdirSync(sourceSkillsDir).filter(file => {
      return fs.statSync(path.join(sourceSkillsDir, file)).isDirectory();
    });
    skills.forEach(s => installSkillLogic(s, lang, agent, targetBaseDir, dryRun));
  }
}

function installSkillLogic(skillName, lang, agent, targetBaseDir, dryRun = false) {
  const sourceDir = path.join(sourceSkillsDir, skillName);
  const destDir = path.join(targetBaseDir, skillName);

  if (!fs.existsSync(sourceDir)) {
    console.error(`Error: Skill "${skillName}" does not exist in path: ${sourceDir}`);
    process.exit(1);
  }

  console.log(`[INSTALLING] Skill "${skillName}" (Language: ${lang}, Target Agent: ${agent})`);
  if (dryRun) console.log('  *** DRY-RUN MODE: No files will be modified ***');

  function copyRecursive(src, dest) {
    if (!fs.existsSync(src)) return;
    const stats = fs.statSync(src);

    if (stats.isDirectory()) {
      if (!fs.existsSync(dest) && !dryRun) {
        fs.mkdirSync(dest, { recursive: true });
      }
      const files = fs.readdirSync(src);
      const fileMappings = [];
      const filesToSkip = new Set();

      files.forEach(file => {
        const filePath = path.join(src, file);
        if (fs.statSync(filePath).isDirectory()) return;

        const ext = path.extname(file);
        const base = path.basename(file, ext);
        const langSuffix = `.${lang}`;

        if (base.endsWith(langSuffix)) {
          const originalBaseName = base.slice(0, -langSuffix.length);
          const originalFileName = originalBaseName + ext;
          fileMappings.push({ srcFile: file, destFile: originalFileName });
          if (files.includes(originalFileName)) {
            filesToSkip.add(originalFileName);
          }
        }
      });

      files.forEach(file => {
        const srcPath = path.join(src, file);
        const destPath = path.join(dest, file);

        if (fs.statSync(srcPath).isDirectory()) {
          copyRecursive(srcPath, destPath);
          return;
        }

        if (filesToSkip.has(file)) return;

        const ext = path.extname(file);
        const base = path.basename(file, ext);
        const langMatch = base.match(/\.([a-z]{2})$/);
        if (langMatch) {
          const matchedLang = langMatch[1];
          if (matchedLang !== lang) return; // Skip other translations
        }

        const mapping = fileMappings.find(m => m.srcFile === file);
        if (mapping) {
          const mappedDestPath = path.join(dest, mapping.destFile);
          console.log(`  Copy: ${file} -> ${mapping.destFile}`);
          if (!dryRun) fs.copyFileSync(srcPath, mappedDestPath);
          return;
        }

        console.log(`  Copy: ${file} -> ${file}`);
        if (!dryRun) fs.copyFileSync(srcPath, destPath);
      });
    } else {
      console.log(`  Copy: ${path.basename(src)} -> ${path.basename(dest)}`);
      if (!dryRun) fs.copyFileSync(src, dest);
    }
  }

  copyRecursive(sourceDir, destDir);
  console.log(`[SUCCESS] Installed "${skillName}" to: ${destDir}\n`);
}
