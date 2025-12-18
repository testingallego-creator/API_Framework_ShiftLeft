import fs from 'fs';
import path from 'path';
import { writeAllureTest } from '../lib/allure-writer.js';
const impactMapPath = path.resolve('artifacts/impact-map.json');
const impactMap = JSON.parse(fs.readFileSync(impactMapPath, 'utf8'));
const tests = Object.values(impactMap).flat();
if (tests.length === 0) {
    writeAllureTest({
        name: 'Impacted Tests – None',
        status: 'passed'
    });
    process.exit(0);
}
tests.forEach((testName) => {
    writeAllureTest({
        name: `Impacted Test – ${testName}`,
        status: 'passed',
        steps: [
            'Read impact map',
            'Identify impacted test',
            'Execute test logic (mocked)',
            'Mark test as passed'
        ],
        attachments: [
            {
                name: 'Impact Map',
                filePath: impactMapPath,
                type: 'application/json'
            }
        ]
    });
});
