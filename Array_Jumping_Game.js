/*
Array Jumping Game
You are attempting to solve a Coding Contract. You have 1 try remaining, after which the contract will self-destruct.


You are given the following array of integers:

2,9,3,7,8,1,1,2,0,0,4,10,4,7,0,7,0,10,7,2,0

Each element in the array represents your MAXIMUM jump length at that position. This means that if you are at position i and your maximum jump length is n, you can jump to any position from i to i+n.

Assuming you are initially positioned at the start of the array, determine whether you are able to reach the last index.

Your answer should be submitted as 1 or 0, representing true and false respectively.


If your solution is an empty string, you must leave the text box empty. Do not use "", '', or ``.
*/

export async function main(ns) {
    //ns.ui.openTail();

    const [input, contractFileName, serverCoding] = ns.args;
    const arr = JSON.parse(input);

    ns.print(`Array: ${JSON.stringify(arr)}`);

    const canReachEnd = canJumpToEnd(arr);
    ns.print(`Can reach end: ${canReachEnd}`);

    const reward = ns.codingcontract.attempt(canReachEnd ? "1" : "0", contractFileName, serverCoding);
    if (reward) {
        ns.tprint(`\u001b[32mSolved ${contractFileName} on ${serverCoding}: ${reward}\u001b[0m`);
    } else {
        ns.tprint(`\u001b[31mFailed to solve ${contractFileName} on ${serverCoding}\u001b[0m`);
    }
}

function canJumpToEnd(arr) {
    const n = arr.length;
    let maxReach = 0;

    for (let i = 0; i < n; i++) {
        if (i > maxReach) return false;
        maxReach = Math.max(maxReach, i + arr[i]);
    }

    return true;
}