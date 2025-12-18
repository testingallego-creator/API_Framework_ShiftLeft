import protobuf from 'protobufjs';
import fs from 'fs';
import path from 'path';
export async function validateProto(protoDir) {
    if (!fs.existsSync(protoDir)) {
        console.log('No gRPC contracts found, skipping');
        return;
    }
    console.log('Validating gRPC proto files');
    const files = fs
        .readdirSync(protoDir)
        .filter((f) => f.endsWith('.proto'));
    for (const file of files) {
        const fullPath = path.join(protoDir, file);
        try {
            await protobuf.load(fullPath);
            console.log(`✔ gRPC proto valid: ${file}`);
        }
        catch (err) {
            throw new Error(`Invalid gRPC proto: ${file}\n${err}`);
        }
    }
}
