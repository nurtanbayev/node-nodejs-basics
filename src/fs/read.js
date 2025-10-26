import {access, readFile} from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const read = async () => {
    const filename = fileURLToPath(import.meta.url);
    const dirname = path.dirname(filename);
    const fileToRead = path.join(dirname, 'files', 'fileToRead.txt');

    try {
        await access(fileToRead);
        const fileContent = await readFile(fileToRead, {encoding: 'utf8'});
        console.log(fileContent)
    } catch(err) {
        if (err && err.code === 'ENOENT') {
            console.error('FS operation failed')
        } else {
            console.error(err.message)
        }
    }
};

await read();