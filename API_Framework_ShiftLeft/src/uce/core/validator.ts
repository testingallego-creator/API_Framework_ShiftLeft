import fs from 'fs';
import path from 'path';
import protobuf from 'protobufjs';

const CONTRACT_PATH = 'contracts/grpc';

export async function validateProto() {
  console.log('Validating gRPC proto files');

  const files = fs.readdirSync(CONTRACT_PATH).filter(f => f.endsWith('.proto'));

  for (const file of files) {
    await protobuf.load(path.join(CONTRACT_PATH, file));
    console.log(`✔ Proto valid: ${file}`);
  }
}
