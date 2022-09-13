import fs from 'fs';
import { bitsToBytes } from "./utils.js";

const zeroWords = ['слава'];
const oneWords = ['україні', 'героям'];

const fileName = process.argv[process.argv.length - 1];
const fileNameWithoutExt = fileName.split('.').slice(0, -1).join('.');

fs.readFile(fileName, 'utf-8', (err, data) => {
    if (err) {
        console.error('Reading error: ', err);
        return;
    }

    const bits = data
        .toLowerCase()
        .replaceAll('\n', ' ')
        .trim()
        .split(' ')
        .map((word) => {
            if (zeroWords.includes(word)) {
                return 0;
            }

            if (oneWords.includes(word)) {
                return 1;
            }

            throw new Error(`Unexpected word: ${word}`);
        });

    const bytes = bitsToBytes(bits);

    fs.writeFile(fileNameWithoutExt, bytes, (err) => {
        if (err) {
            console.error('Writing error: ', err);
            return;
        }

        fs.chmodSync(fileNameWithoutExt, 0o755);
    });
});
