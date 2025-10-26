import { access, readdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const list = async () => {
    const filename = fileURLToPath(import.meta.url);
    const dirname = path.dirname(filename);

    try {
        await access(dirname);
        const files = await readdir(dirname);
        console.log(files);
    } catch (err) {
        if (err && err.code === 'ENOENT') {
            console.error('FS operation failed');
        } else {
            console.error(err.message);
        }
    }
};

await list();
