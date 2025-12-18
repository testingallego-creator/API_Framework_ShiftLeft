import fs from 'node:fs';
import path from 'node:path';
import { buildSchema, validateSchema } from 'graphql';
const GRAPHQL_DIR = 'contracts/graphql';
export async function validateGraphQL() {
    if (!fs.existsSync(GRAPHQL_DIR)) {
        console.log('No GraphQL contracts found, skipping');
        return;
    }
    const files = fs
        .readdirSync(GRAPHQL_DIR)
        .filter((f) => f.endsWith('.graphql'));
    if (files.length === 0) {
        console.log('GraphQL contract folder empty, skipping');
        return;
    }
    console.log('Validating GraphQL schemas');
    for (const file of files) {
        const schemaPath = path.join(GRAPHQL_DIR, file);
        const schemaText = fs.readFileSync(schemaPath, 'utf-8');
        const schema = buildSchema(schemaText);
        const errors = validateSchema(schema);
        if (errors.length > 0) {
            throw new Error(`Invalid GraphQL schema: ${file}`);
        }
        console.log(`GraphQL valid: ${file}`);
    }
}
