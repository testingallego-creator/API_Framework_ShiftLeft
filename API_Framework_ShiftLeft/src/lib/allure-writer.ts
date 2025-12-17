import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const RESULTS_DIR = 'allure-results';
fs.mkdirSync(RESULTS_DIR, { recursive: true });

type Step = {
  name: string;
  status: 'passed';
};

type Attachment = {
  name: string;
  source: string;
  type: string;
};

export function writeAllureTest(params: {
  name: string;
  status: 'passed' | 'failed';
  steps?: string[];
  attachments?: { name: string; filePath: string; type?: string }[];
  errorMessage?: string;
}) {
  const uuid = crypto.randomUUID();
  const now = Date.now();

  const result: any = {
    uuid,
    name: params.name,
    status: params.status,
    stage: 'finished',
    start: now,
    stop: now
  };

  /* -------- Steps -------- */
  if (params.steps) {
    result.steps = params.steps.map(
      (step): Step => ({
        name: step,
        status: 'passed'
      })
    );
  }

  /* -------- Attachments -------- */
  if (params.attachments) {
    result.attachments = [];

    params.attachments.forEach(att => {
      const attachmentName = `${uuid}-${path.basename(att.filePath)}`;
      const targetPath = path.join(RESULTS_DIR, attachmentName);

      fs.copyFileSync(att.filePath, targetPath);

      result.attachments.push({
        name: att.name,
        source: attachmentName,
        type: att.type || 'text/plain'
      } as Attachment);
    });
  }

  /* -------- Write result -------- */
  fs.writeFileSync(
    path.join(RESULTS_DIR, `${uuid}-result.json`),
    JSON.stringify(result, null, 2)
  );

  /* -------- Failure message -------- */
  if (params.status === 'failed' && params.errorMessage) {
    fs.writeFileSync(
      path.join(RESULTS_DIR, `${uuid}-error.txt`),
      params.errorMessage
    );
  }
}
