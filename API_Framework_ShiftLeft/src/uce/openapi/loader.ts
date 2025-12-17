import fs from 'node:fs';
import path from 'node:path';

/**
 * Loads OpenAPI spec file paths
 */
export function loadOpenApiSpec(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter(
      (file) =>
        file.endsWith('.yaml') ||
        file.endsWith('.yml') ||
        file.endsWith('.json')
    )
    .map((file) => path.join(dir, file));
}

/**
 * BACKWARD-COMPAT EXPORT
 * Required by scripts
 */
export function loadOpenAPIs(dir: string): string[] {
  return loadOpenApiSpec(dir);
}
