import path from 'path';
import { release, version } from 'os';
import { createServer as createServerHttp } from 'http';
import './files/c.cjs';
import { fileURLToPath } from 'url';

// written and tested on Node.js v25.0.0

const random = Math.random();

let unknownObject;

if (random > 0.5) {
    const moduleA = await import('./files/a.json', { with: { type: 'json' } });
    unknownObject = moduleA.default;
} else {
    const moduleB = await import('./files/b.json', { with: { type: 'json' } });
    unknownObject = moduleB.default;
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

const myServer = createServerHttp((_, res) => {
    res.end('Request accepted');
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log('To terminate it, use Ctrl+C combination');
});

export { unknownObject, myServer };
