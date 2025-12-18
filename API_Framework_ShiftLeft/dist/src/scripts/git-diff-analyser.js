import { execSync } from 'child_process';
/**
 * Returns list of files changed in the current branch
 * compared to main (or master).
 *
 * Used by shift-left impacted test runner.
 */
export function getChangedFiles() {
    try {
        // Change 'origin/main' if your default branch is different
        const diffOutput = execSync('git diff --name-only origin/main', { encoding: 'utf-8' });
        return diffOutput
            .split('\n')
            .map(f => f.trim())
            .filter(Boolean);
    }
    catch (error) {
        console.warn('Could not determine git diff, running safe fallback');
        return [];
    }
}
