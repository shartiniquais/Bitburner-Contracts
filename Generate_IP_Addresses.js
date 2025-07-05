/*
Generate IP Addresses
You are attempting to solve a Coding Contract. You have 10 tries remaining, after which the contract will self-destruct.


Given the following string containing only digits, return an array with all possible valid IP address combinations that can be created from the string:

1371555829

Note that an octet cannot begin with a '0' unless the number itself is exactly '0'. For example, '192.168.010.1' is not a valid IP.

Examples:

25525511135 -> ["255.255.11.135", "255.255.111.35"]
1938718066 -> ["193.87.180.66"]


If your solution is an empty string, you must leave the text box empty. Do not use "", '', or ``.
*/

export async function main(ns) {
    //ns.ui.openTail();

    const [inputRaw, contractFileName, serverCoding] = ns.args;
    const input = JSON.parse(inputRaw);
    const ipAddresses = generateIPAddresses(input.toString());

    ns.print(`Input: ${input}`);
    ns.print(`Generated IP Addresses: ${JSON.stringify(ipAddresses)}`);

    const reward = ns.codingcontract.attempt(ipAddresses, contractFileName, serverCoding);
    if (reward) {
        ns.tprint(`\u001b[32mSolved ${contractFileName} on ${serverCoding}: ${reward}\u001b[0m`);
    } else {
        ns.tprint(`\u001b[31mFailed to solve ${contractFileName} on ${serverCoding}\u001b[0m`);
    }
}

function generateIPAddresses(input) {
    const result = [];
    const backtrack = (start, path) => {
        if (path.length === 4 && start === input.length) {
            result.push(path.join('.'));
            return;
        }
        if (path.length === 4 || start === input.length) {
            return;
        }
        for (let len = 1; len <= 3; len++) {
            const segment = input.substring(start, start + len);
            if (isValidSegment(segment)) {
                path.push(segment);
                backtrack(start + len, path);
                path.pop();
            }
        }
    };
    backtrack(0, []);
    return result;
}

function isValidSegment(segment) {
    if (segment.length > 1 && segment.startsWith('0')) return false;
    const num = parseInt(segment);
    return num >= 0 && num <= 255;
}