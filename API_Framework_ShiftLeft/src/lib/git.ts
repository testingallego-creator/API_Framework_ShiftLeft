import { execSync } from 'child_process';

/**
 * Returns list of files changed compared to default branch.
 * Used for shift-left impacted test execution.
 */
export function getChangedFiles(
  baseBranch: string = 'origin/main'
): string[] {
  try {
    const diff = execSync(
      `git diff --name-only ${baseBranch}`,
      { encoding: 'utf-8' }
    );

    return diff
      .split('\n')
      .map(file => file.trim())
      .filter(Boolean);
  } catch (error) {
    console.warn('⚠️ Unable to compute git diff, returning empty list');
    return [];
  }
}
