import { createReadStream, createWriteStream } from 'fs';
import { createGunzip } from 'zlib';
import { pipeline } from 'stream/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const decompress = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const sourcePath = path.join(__dirname, 'files', 'archive.gz');
    const destPath = path.join(__dirname, 'fileToCompress.txt'); // decompressed file is saved in /zip folder (not /zip/files!)

    const readableStream = createReadStream(sourcePath);
    const writableStream = createWriteStream(destPath);
    const gunzip = createGunzip();

    try {
        await pipeline(readableStream, gunzip, writableStream);
    } catch (err) {
        console.error(err.message);
    }
};

await decompress();
