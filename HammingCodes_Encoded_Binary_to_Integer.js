/*
HammingCodes: Encoded Binary to Integer
You are attempting to solve a Coding Contract. You have 10 tries remaining, after which the contract will self-destruct.


You are given the following encoded binary string:
'1100100101101100'

Decode it as an 'extended Hamming code' and convert it to a decimal value.
The binary string may include leading zeroes.
A parity bit is inserted at position 0 and at every position N where N is a power of 2.
Parity bits are used to make the total number of '1' bits in a given set of data even.
The parity bit at position 0 considers all bits including parity bits.
Each parity bit at position 2^N alternately considers 2^N bits then ignores 2^N bits, starting at position 2^N.
The endianness of the parity bits is reversed compared to the endianness of the data bits:
Data bits are encoded most significant bit first and the parity bits encoded least significant bit first.
The parity bit at position 0 is set last.
There is a ~55% chance for an altered bit at a random index.
Find the possible altered bit, fix it and extract the decimal value.

Examples:

'11110000' passes the parity checks and has data bits of 1000, which is 8 in binary.
'1001101010' fails the parity checks and needs the last bit to be corrected to get '1001101011', after which the data bits are found to be 10101, which is 21 in binary.

For more information on the 'rule' of encoding, refer to Wikipedia (https://wikipedia.org/wiki/Hamming_code) or the 3Blue1Brown videos on Hamming Codes. (https://youtube.com/watch?v=X8jsijhllIA)


If your solution is an empty string, you must leave the text box empty. Do not use "", '', or ``.

*/
export async function main(ns) {
    const [input, contractFileName, serverCoding] = ns.args;

    const decodedValue = decodeHammingCode(input.slice(1,-1)); // slice to remove '"'

    ns.tprint(`Decoded Value: ${decodedValue}`);
    
    const reward = ns.codingcontract.attempt(decodedValue.toString(), contractFileName, serverCoding);
    if (reward) {
        ns.tprint(`\u001b[32mSolved ${contractFileName} on ${serverCoding}: ${reward}\u001b[0m`);
    } else {
        ns.tprint(`\u001b[31mFailed to solve ${contractFileName} on ${serverCoding}\u001b[0m`);
    }
}

function decodeHammingCode(bits) {
    const encoded = bits.split('').map((b) => parseInt(b, 10));
    const n = encoded.length;

    // Determine error location using parity checks
    let errorPos = 0;
    for (let p = 1; p < n; p <<= 1) {
        let parity = 0;
        for (let i = 1; i < n; i++) {
            if (i === p) continue;
            if ((i & p) !== 0) {
                parity ^= encoded[i];
            }
        }
        if (parity !== encoded[p]) {
            errorPos |= p;
        }
    }

    const globalParity = encoded.reduce((acc, bit) => acc ^ bit, 0);
    if (globalParity !== 0 && errorPos === 0) {
        errorPos = 0;
    }

    // Correct the erroneous bit if one was found
    if (errorPos > 0 && errorPos < n) {
        encoded[errorPos] ^= 1;
    }

    // Extract the data bits (skip parity positions)
    const data = [];
    for (let i = 1; i < n; i++) {
        if ((i & (i - 1)) !== 0) {
            data.push(encoded[i]);
        }
    }

    const binaryStr = data.join('');
    return parseInt(binaryStr, 2);
}