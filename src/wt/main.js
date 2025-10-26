import { Worker } from 'worker_threads';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

const performCalculations = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const numCPUs = os.cpus().length;
    const results = [];

    const workerPath = path.join(__dirname, 'worker.js');

    const workerPromises = Array.from({ length: numCPUs }, (_, i) => {
        const worker = new Worker(workerPath, { type: 'module' });
        const n = 10 + i;

        return new Promise((resolve) => {
            worker.on('message', (message) => {
                if (message?.error) {
                    resolve({ status: 'error', data: null });
                } else {
                    resolve({ status: 'resolved', data: message });
                }
            });

            worker.on('error', () => resolve({ status: 'error', data: null }));
            worker.on('exit', (code) => {
                if (code !== 0) {
                    resolve({ status: 'error', data: null });
                }
            });

            worker.postMessage(n);
        });
    });

    const settledResults = await Promise.all(workerPromises);
    console.log(settledResults);
};

await performCalculations();