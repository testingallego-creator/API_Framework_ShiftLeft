import fs from 'fs';
import path from 'path';
import { loadOpenAPIs } from '../uce/openapi/loader.js';
import { normalize } from '../uce/openapi/normalizer.js';


/**
 * STEP 4
 * Builds an impact map from OpenAPI contracts
 * Operation → impacted test files
 */

const CONTRACT_DIR = 'contracts/rest';
const ARTIFACTS_DIR = 'artifacts';
const OUTPUT_FILE = path.join(ARTIFACTS_DIR, 'impact-map.json');

// Load contracts
const specs: any[] = loadOpenAPIs(CONTRACT_DIR);

// Ensure artifacts directory exists (CRITICAL)
fs.mkdirSync(ARTIFACTS_DIR, { recursive: true });

// Impact map structure
// {
//   "getUsers": ["tests/rest/getUsers.test.js"]
// }
const impactMap: Record<string, string[]> = {};

specs.forEach((spec: any) => {
  const service = normalize(spec);

  service.operations.forEach(op => {
    impactMap[op.id] = [`tests/rest/${op.id}.test.js`];
  });
});

// Write impact map
fs.writeFileSync(
  OUTPUT_FILE,
  JSON.stringify(impactMap, null, 2),
  { encoding: 'utf-8' }
);

console.log('✔ Impact map generated');

