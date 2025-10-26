import { createReadStream, createWriteStream } from 'fs';
import { createGzip } from 'zlib';
import { pipeline } from 'stream/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const compress = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const sourcePath = path.join(__dirname, 'files', 'fileToCompress.txt');
    const destPath = path.join(__dirname, 'files', 'archive.gz');

    const readableStream = createReadStream(sourcePath);
    const writableStream = createWriteStream(destPath);
    const gzip = createGzip();

    try {
        await pipeline(readableStream, gzip, writableStream);
    } catch (err) {
        console.error(err.message);
    }
};

await compress();
