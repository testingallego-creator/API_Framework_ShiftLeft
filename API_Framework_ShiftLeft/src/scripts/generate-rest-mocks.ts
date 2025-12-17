import fs from 'node:fs';
import path from 'node:path';
import SwaggerParser from '@apidevtools/swagger-parser';
import { faker } from '@faker-js/faker';

const CONTRACT_DIR = 'contracts/rest';
const OUTPUT_DIR = 'src/mocks/generated';
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'rest.handlers.ts');

function generateMockValue(schema: any): any {
  if (!schema) return null;

  if (schema.example) return schema.example;

  switch (schema.type) {
    case 'string':
      if (schema.format === 'email') return faker.internet.email();
      if (schema.format === 'uuid') return faker.string.uuid();
      if (schema.format === 'date-time')
        return faker.date.recent().toISOString();
      return faker.word.words(2);

    case 'integer':
    case 'number':
      return faker.number.int({ min: 1, max: 100 });

    case 'boolean':
      return faker.datatype.boolean();

    case 'array':
      return [generateMockValue(schema.items)];

    case 'object': {
      const obj: any = {};
      if (schema.properties) {
        for (const key of Object.keys(schema.properties)) {
          obj[key] = generateMockValue(schema.properties[key]);
        }
      }
      return obj;
    }

    default:
      return null;
  }
}

async function generateMocks() {
  if (!fs.existsSync(CONTRACT_DIR)) {
    console.warn(`⚠️ No REST contracts found at ${CONTRACT_DIR}`);
    return;
  }

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const handlers: string[] = [];
  const files = fs.readdirSync(CONTRACT_DIR).filter(f => f.endsWith('.yaml'));

  for (const file of files) {
    const spec: any = await SwaggerParser.dereference(
      path.join(CONTRACT_DIR, file)
    );

    if (!spec.paths) continue;

    for (const apiPath of Object.keys(spec.paths)) {
      const mswPath = apiPath.replace(/{/g, ':').replace(/}/g, '');

      for (const method of Object.keys(spec.paths[apiPath])) {
        const operation = spec.paths[apiPath][method];

        const response =
          operation.responses?.['200'] ||
          operation.responses?.['201'] ||
          operation.responses?.['default'];

        const schema =
          response?.content?.['application/json']?.schema;

        const mockBody = schema
          ? JSON.stringify(generateMockValue(schema), null, 2)
          : '{}';

        // IMPORTANT: NO SEMICOLON HERE
        handlers.push(
          `http.${method}('${mswPath}', () => {
  return HttpResponse.json(${mockBody});
})`
        );
      }
    }
  }

  const fileContent = `import { http, HttpResponse } from 'msw';

export const handlers = [
${handlers.join(',\n')}
];
`;

  fs.writeFileSync(OUTPUT_FILE, fileContent);
  console.log(`✅ MSW REST mocks generated at ${OUTPUT_FILE}`);
}

generateMocks();
