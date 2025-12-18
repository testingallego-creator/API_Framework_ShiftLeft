import { loadOpenAPIs } from '../uce/openapi/loader.js';
import { normalize } from '../uce/openapi/normalizer.js';
import { writeAllureTest } from '../lib/allure-writer.js';
try {
    const specs = loadOpenAPIs('contracts/rest');
    specs.forEach((spec) => normalize(spec));
    writeAllureTest({
        name: 'Contract Validation – OpenAPI',
        status: 'passed',
        steps: [
            'Load OpenAPI contract',
            'Parse YAML specification',
            'Normalize OpenAPI schema',
            'Validate contract structure'
        ],
        attachments: [
            {
                name: 'OpenAPI Contract',
                filePath: 'contracts/rest/sample-api.yaml',
                type: 'application/yaml'
            }
        ]
    });
}
catch (err) {
    writeAllureTest({
        name: 'Contract Validation – OpenAPI',
        status: 'failed',
        errorMessage: err.message
    });
    throw err;
}
