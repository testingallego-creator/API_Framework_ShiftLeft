import SwaggerParser from '@apidevtools/swagger-parser';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const Ajv = require('ajv');
let ajv;
let apiSpec;
export async function loadOpenApiSpec(specPath) {
    apiSpec = await SwaggerParser.dereference(specPath);
    ajv = new Ajv({ strict: false, allErrors: true });
}
export function validateOpenApiResponse(apiPath, method, status, responseBody) {
    const pathDef = apiSpec.paths?.[apiPath];
    if (!pathDef)
        return;
    const operation = pathDef[method.toLowerCase()];
    if (!operation)
        return;
    const response = operation.responses?.[status] ||
        operation.responses?.[String(status)];
    const schema = response?.content?.['application/json']?.schema;
    if (!schema)
        return;
    const validate = ajv.compile(schema);
    const valid = validate(responseBody);
    if (!valid) {
        throw new Error(`❌ OpenAPI response validation failed:\n${JSON.stringify(validate.errors, null, 2)}`);
    }
}
