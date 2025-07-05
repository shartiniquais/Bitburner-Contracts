/*
HammingCodes: Integer to Encoded Binary
You are attempting to solve a Coding Contract. You have 10 tries remaining, after which the contract will self-destruct.


You are given the following decimal value:
31

Convert it to a binary representation and encode it as an 'extended Hamming code'.
The number should be converted to a string of '0' and '1' with no leading zeroes.
A parity bit is inserted at position 0 and at every position N where N is a power of 2.
Parity bits are used to make the total number of '1' bits in a given set of data even.
The parity bit at position 0 considers all bits including parity bits.
Each parity bit at position 2^N alternately considers 2^N bits then ignores 2^N bits, starting at position 2^N.
The endianness of the parity bits is reversed compared to the endianness of the data bits:
Data bits are encoded most significant bit first and the parity bits encoded least significant bit first.
The parity bit at position 0 is set last.

Examples:

8 in binary is 1000, and encodes to 11110000 (pppdpddd - where p is a parity bit and d is a data bit)
21 in binary is 10101, and encodes to 1001101011 (pppdpdddpd)

For more information on the 'rule' of encoding, refer to Wikipedia (https://wikipedia.org/wiki/Hamming_code) or the 3Blue1Brown videos on Hamming Codes. (https://youtube.com/watch?v=X8jsijhllIA)


If your solution is an empty string, you must leave the text box empty. Do not use "", '', or ``.
*/

export async function main(ns) {
    const [input, contractFileName, serverCoding] = ns.args;

    // Convert input to integer
    const decimalValue = parseInt(input, 10);
    if (isNaN(decimalValue)) {
        ns.print(`Invalid input: ${input}`);
        return;
    }

    const encodedValue = encodeHammingCode(decimalValue);
    ns.print(`Encoded Value: ${encodedValue}`);

    const reward = ns.codingcontract.attempt(encodedValue, contractFileName, serverCoding);
    if (reward) {
        ns.tprint(`\u001b[32mSolved ${contractFileName} on ${serverCoding}: ${reward}\u001b[0m`);
    } else {
        ns.tprint(`\u001b[31mFailed to solve ${contractFileName} on ${serverCoding}\u001b[0m`);
    }
}

function encodeHammingCode(decimalValue) {
    // Convert to binary string (MSB first)
    const dataBits = decimalValue.toString(2).split('').map(Number);
    const dataLength = dataBits.length;

    // Compute how many parity bits we need (including position 0)
    let totalBits = dataLength;
    let parityCount = 0;
    while ((1 << parityCount) < totalBits + parityCount + 1) {
        parityCount++;
    }

    const hammingSize = dataLength + parityCount + 1; // +1 for position 0
    const hamming = new Array(hammingSize).fill(0);

    // Fill data bits (MSB first), skipping parity positions (powers of 2 including 0)
    let dataIndex = 0;
    for (let i = 1; i < hammingSize; i++) {
        if (!isPowerOfTwo(i)) {
            hamming[i] = dataBits[dataIndex++];
        }
    }

    // Calculate parity bits (excluding position 0)
    for (let p = 1; p < hammingSize; p <<= 1) {
        let count = 0;
        for (let i = p; i < hammingSize; i += 2 * p) {
            for (let j = i; j < i + p && j < hammingSize; j++) {
                count += hamming[j];
            }
        }
        hamming[p] = count % 2;
    }

    // Now compute parity bit at position 0 (parity of all bits)
    const totalOnes = hamming.reduce((sum, bit) => sum + bit, 0);
    hamming[0] = totalOnes % 2;

    return hamming.join('');
}

function isPowerOfTwo(x) {
    return (x & (x - 1)) === 0;
}
