import { access, rename as renameFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const rename = async () => {
    const dirname = path.dirname(fileURLToPath(import.meta.url));
    const fileToRename = path.join(dirname, 'files', 'wrongFilename.txt');

    try {
        await access(fileToRename);
        await renameFile(fileToRename, dirname + '/files/properFilename.md');
    } catch (err) {
        if (err && err.code === 'ENOENT') {
            console.error('FS operation failed');
        } else {
            console.error(err.message);
        }
    }
};

await rename();
