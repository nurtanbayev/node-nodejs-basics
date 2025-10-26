import {writeFile, access}  from 'fs/promises';
import  path from 'path'
import { fileURLToPath } from 'url';

const create = async () => {
    const fileName = fileURLToPath(import.meta.url);
    const filePath = path.join(path.dirname(fileName), 'files', 'fresh.txt');
    
    try {
        try {
            await access(filePath)
            throw new Error('FS operation failed')
        } catch (err) {
            if (err.code !== 'ENOENT') {
                throw new Error('FS operation failed')
            }
        }

        await writeFile(filePath, 'I am fresh and young')
    } catch (err) {
        console.error(err.message)
    }
};

await create();