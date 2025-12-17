import fs from 'node:fs';
import path from 'node:path';
import SwaggerParser from '@apidevtools/swagger-parser';
import { loadOpenApiSpec } from './loader.js';

const REST_DIR = 'contracts/rest';

export async function validateOpenAPI(): Promise<void> {
  if (!fs.existsSync(REST_DIR)) {
    console.log('No REST (OpenAPI) contracts found, skipping');
    return;
  }

  const specs = loadOpenApiSpec(REST_DIR);

  if (specs.length === 0) {
    console.log('REST contract folder empty, skipping');
    return;
  }

  console.log('Validating OpenAPI contracts');

  const parser = new SwaggerParser();

  for (const spec of specs) {
    await parser.validate(spec);
    console.log(`✔ OpenAPI valid: ${path.basename(spec)}`);
  }
}
