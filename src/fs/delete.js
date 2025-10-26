import { unlink, access } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const remove = async () => {
    const filename = fileURLToPath(import.meta.url);
    const dirname = path.dirname(filename);
    const fileToRemove = path.join(dirname, 'files', 'fileToRemove.txt');
    try {
        await access(fileToRemove);
        await unlink(fileToRemove);
    } catch(err) {
        if (err && err.code === 'ENOENT') {
            console.error('FS operation failed')
        } else {
            console.error(err.message)
        }
    }
};

await remove();
