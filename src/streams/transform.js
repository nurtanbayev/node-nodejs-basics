import { Transform } from 'stream';
import { pipeline } from 'stream/promises';

const transform = async () => {
  const reverseStream = new Transform({
    transform(chunk, encoding, callback) {
      const input = chunk.toString().trim();
      const reversed = input.split('').reverse().join('');
      callback(null, reversed + '\n');
    },
  });

  try {
    await pipeline(process.stdin, reverseStream, process.stdout);
  } catch (err) {
    console.error(err.message);
  }
};

await transform();