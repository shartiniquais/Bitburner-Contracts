/*
Compression II: LZ Decompression
You are attempting to solve a Coding Contract. You have 10 tries remaining, after which the contract will self-destruct.


Lempel-Ziv (LZ) compression is a data compression technique which encodes data using references to earlier parts of the data. In this variant of LZ, data is encoded in two types of chunk. Each chunk begins with a length L, encoded as a single ASCII digit from 1 to 9, followed by the chunk data, which is either:

1. Exactly L characters, which are to be copied directly into the uncompressed data.
2. A reference to an earlier part of the uncompressed data. To do this, the length is followed by a second ASCII digit X: each of the L output characters is a copy of the character X places before it in the uncompressed data.

For both chunk types, a length of 0 instead means the chunk ends immediately, and the next character is the start of a new chunk. The two chunk types alternate, starting with type 1, and the final chunk may be of either type.

You are given the following LZ-encoded string:
    4Mx8H327AxmQbjL879nZA4pEsOj092GAD8tMb0384N6jB930723n7I8811
Decode it and output the original string.

Example: decoding '5aaabb450723abb' chunk-by-chunk

    5aaabb           ->  aaabb
    5aaabb45         ->  aaabbaaab
    5aaabb450        ->  aaabbaaab
    5aaabb45072      ->  aaabbaaababababa
    5aaabb450723abb  ->  aaabbaaababababaabb


If your solution is an empty string, you must leave the text box empty. Do not use "", '', or ``.

*/

export async function main(ns) {
    const [encodedString, contractFileName, serverCoding] = ns.args;

    const decodedString = decodeLZ(encodedString.slice(1, -1)); // Remove the surrounding quotes
    ns.print(`Decoded String: ${decodedString}`);

    const reward = ns.codingcontract.attempt(decodedString, contractFileName, serverCoding);
    if (reward) {
        ns.tprint(`\u001b[32mSolved ${contractFileName} on ${serverCoding}: ${reward}\u001b[0m`);
    } else {
        ns.tprint(`\u001b[31mFailed to solve ${contractFileName} on ${serverCoding}\u001b[0m`);
    }
}

function decodeLZ(encodedString) {
    let decoded = '';
    let i = 0;
    let isLiteral = true;

    while (i < encodedString.length) {
        const lenChar = encodedString[i];
        const len = parseInt(lenChar, 10);
        i++;

        if (Number.isNaN(len)) {
            throw new Error(`Invalid length digit '${lenChar}' at position ${i - 1}`);
        }

        if (len === 0) {
            isLiteral = !isLiteral;
            continue;
        }

        if (isLiteral) {
            const chunk = encodedString.slice(i, i + len);
            if (chunk.length < len) {
                throw new Error(`Unexpected end of input during literal at position ${i}`);
            }
            decoded += chunk;
            i += len;
        } else {
            const offsetChar = encodedString[i];
            const offset = parseInt(offsetChar, 10);
            i++;

            if (Number.isNaN(offset)) {
                throw new Error(`Invalid offset digit '${offsetChar}' at position ${i - 1}`);
            }

            const start = decoded.length - offset;
            if (start < 0) {
                throw new Error(`Invalid back-reference: offset ${offset} too large`);
            }

            for (let j = 0; j < len; j++) {
                decoded += decoded[start + j];
            }
        }

        isLiteral = !isLiteral;
    }

    return decoded;
}
