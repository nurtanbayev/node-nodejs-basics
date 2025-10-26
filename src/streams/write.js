// write.js
import { createWriteStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pipeline } from 'stream/promises';

const write = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePath = path.join(__dirname, 'files', 'fileToWrite.txt');

    try {
        const writableStream = createWriteStream(filePath, {
            encoding: 'utf8',
        });

        await pipeline(process.stdin, writableStream);
    } catch (err) {
        console.error(err.message);
    }
};

await write();
