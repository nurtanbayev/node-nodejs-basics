import {access, cp} from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const copy = async () => {
    const fileName = fileURLToPath(import.meta.url);
    const dirPath = path.join(path.dirname(fileName), 'files');
    const newDir = path.join(path.dirname(fileName), 'files_copy');

    try {
        await access(dirPath);

        try {
            await access(newDir);
            throw new Error('FS operation failed');
        } catch (err) {
            if (err.code !== 'ENOENT') {
                throw new Error('FS operation failed');
            }
        }

        await cp(dirPath, newDir, { recursive: true });
    } catch (err) {
        console.error(err.message);
    }
};

await copy();
