import { createReadStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const calculateHash = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const filePath = path.join(__dirname, 'files', 'fileToCalculateHashFor.txt');

    const hash = crypto.createHash('sha256');
    const stream = createReadStream(filePath);

    return new Promise((resolve, reject) => {
        stream.on('error', (err) => {
            reject(err);
        });

        stream.on('data', (chunk) => {
            hash.update(chunk);
        });

        stream.on('end', () => {
            const digestHex = hash.digest('hex');
            console.log(digestHex);
            resolve(digestHex);
        });
    });
};

await calculateHash();