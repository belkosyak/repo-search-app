export const LANGUAGES = {
  JAVASCRIPT: 'javascript',
  TYPESCRIPT: 'typescript',
  PYTHON: 'python',
  JAVA: 'java',
  C_SHARP: 'c#',
  C_PLUS_PLUS: 'c++',
  C: 'c',
  GO: 'go',
  RUBY: 'ruby',
  PHP: 'php',
  HTML: 'html',
  CSS: 'css',
  SQL: 'sql',
  SHELL: 'shell',
  BASH: 'bash',
  POWERSHELL: 'powershell',
  YAML: 'yaml',
  JSON: 'json',
  XML: 'xml',
  MARKDOWN: 'markdown',
} as const;

export const SORT_BY = {
  STARS: 'stars',
  FORKS: 'forks',
  UPDATED: 'updated',
  HELP_WANTED_ISSUES: 'help-wanted-issues',
} as const;

export const SORT_BY_LABELS = {
  [SORT_BY.STARS]: 'Stars',
  [SORT_BY.FORKS]: 'Forks',
  [SORT_BY.UPDATED]: 'Updated',
  [SORT_BY.HELP_WANTED_ISSUES]: 'Help Wanted Issues',
} as const;
