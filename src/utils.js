/**
 * Make an array chunked.
 *
 * @param array
 * @param chunkSize
 * @returns {array}
 */
export function makeChunkedArray(array, chunkSize) {
    const chunks = [];

    let limit = 0;
    while (limit + chunkSize <= array.length) {
        chunks.push(array.slice(limit, chunkSize + limit));
        limit += chunkSize;
    }

    return chunks;
}

/**
 * Convert bits array to bytes.
 *
 * @param {number[]} bits
 * @returns {Uint8Array}
 */
export function bitsToBytes(bits) {
    const bitsChunks = makeChunkedArray(bits, 8);

    const bytesArray = bitsChunks.map((bitsChunk) => parseInt(bitsChunk.join(''), 2));

    return new Uint8Array(bytesArray);
}
