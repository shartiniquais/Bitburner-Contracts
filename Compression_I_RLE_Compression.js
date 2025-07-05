/*

Compression I: RLE Compression
You are attempting to solve a Coding Contract. You have 10 tries remaining, after which the contract will self-destruct.


Run-length encoding (RLE) is a data compression technique which encodes data as a series of runs of a repeated single character. Runs are encoded as a length, followed by the character itself. Lengths are encoded as a single ASCII digit; runs of 10 characters or more are encoded by splitting them into multiple runs.

You are given the following input string:
    oRRRPHHAAAAAAAgggggggggii22222222PPPPPPPPPPPPPxuhhFFnnQ22222
Encode it using run-length encoding with the minimum possible output length.

Examples:

    aaaaabccc            ->  5a1b3c
    aAaAaA               ->  1a1A1a1A1a1A
    111112333            ->  511233
    zzzzzzzzzzzzzzzzzzz  ->  9z9z1z  (or 9z8z2z, etc.)


If your solution is an empty string, you must leave the text box empty. Do not use "", '', or ``.
*/

export async function main(ns) {
    const [input, contractFileName, serverCoding] = ns.args;
    const str = input.slice(1, -1); // Remove the surrounding quotes

    ns.print(`Input String: ${str}`);

    const encodedString = runLengthEncode(str);
    ns.print(`Encoded String: ${encodedString}`);

    const reward = ns.codingcontract.attempt(encodedString, contractFileName, serverCoding);
    if (reward) {
        ns.tprint(`\u001b[32mSolved ${contractFileName} on ${serverCoding}: ${reward}\u001b[0m`);
    } else {
        ns.tprint(`\u001b[31mFailed to solve ${contractFileName} on ${serverCoding}\u001b[0m`);
    }
}

function runLengthEncode(str) {
    let encoded = '';
    let count = 1;

    for (let i = 1; i <= str.length; i++) {
        if (str[i] === str[i - 1]) {
            count++;
        } else {
            // Divise en blocs de 9 max
            let remaining = count;
            while (remaining > 9) {
                encoded += '9' + str[i - 1];
                remaining -= 9;
            }
            encoded += remaining + str[i - 1];
            count = 1;
        }
    }

    return encoded;
}
