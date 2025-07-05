/*

Square Root
You are attempting to solve a Coding Contract. You have 10 tries remaining, after which the contract will self-destruct.


You are given a ~200 digit BigInt. Find the square root of this number, to the nearest integer.

The input is a BigInt value. The answer must be the string representing the solution's BigInt value. The trailing "n" is not part of the string.

Hint: If you are having trouble, you might consult https://en.wikipedia.org/wiki/Methods_of_computing_square_roots

Input number:
78912610538198639331053292621596658512438214974607697621515817974143466747046308685364581880883162836492506991639118518540850385688464075390940429172642953485298092531514670277197580895466052621578072


If your solution is an empty string, you must leave the text box empty. Do not use "", '', or ``.
*/

export async function main(ns) {
    // ns.ui.openTail();

    let [bigIntRaw, contractFileName, serverCoding] = ns.args;

    // If the input is a JSON string, parse it
    if (typeof bigIntRaw !== "string") {
        bigIntRaw = JSON.stringify(bigIntRaw);
    }
    // Remove quotes if present
    if (bigIntRaw.startsWith('"') && bigIntRaw.endsWith('"')) {
        bigIntRaw = bigIntRaw.slice(1, -1);
    }

    const bigInt = BigInt(bigIntRaw);

    ns.print(`BigInt: ${bigInt}`);

    // Calculate the square root using the Babylonian method
    let x = bigInt;
    let y = (x + 1n) / 2n;

    while (y < x) {
        x = y;
        y = (bigInt / x + x) / 2n;
    }

    const result = x.toString();
    ns.print(`Square Root: ${result}`);

    const reward = ns.codingcontract.attempt(result, contractFileName, serverCoding);
    if (reward) {
        ns.tprint(`\u001b[32mSolved ${contractFileName} on ${serverCoding}: ${reward}\u001b[0m`);
    } else {
        ns.tprint(`\u001b[31mFailed to solve ${contractFileName} on ${serverCoding}\u001b[0m`);
    }
}