import { createReadStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const read = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePath = path.join(__dirname, 'files', 'fileToRead.txt');

    const readableStream = createReadStream(filePath, { encoding: 'utf8' });

    readableStream.on('data', (chunk) => {
        process.stdout.write(chunk);
    });
    readableStream.on('end', () => console.log(''));
};

await read();
