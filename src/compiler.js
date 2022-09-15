import { bitsToBytes } from "./utils.js";

const zeroWords = ['слава'];
const oneWords = ['україні', 'героям'];

/**
 * Compile kozak2 code.
 *
 * @param {string} source
 * @returns {Uint8Array}
 */
export function compile(source) {
    const bits = source
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

    return bitsToBytes(bits);
}

