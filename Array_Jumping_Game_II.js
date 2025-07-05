/*
Array Jumping Game II
You are attempting to solve a Coding Contract. You have 3 tries remaining, after which the contract will self-destruct.


You are given the following array of integers:

3,1,4,4,1,1,5,3,5,2,2,3,0,4,2,3

Each element in the array represents your MAXIMUM jump length at that position. This means that if you are at position i and your maximum jump length is n, you can jump to any position from i to i+n.

Assuming you are initially positioned at the start of the array, determine the minimum number of jumps to reach the end of the array.

If it's impossible to reach the end, then the answer should be 0.


If your solution is an empty string, you must leave the text box empty. Do not use "", '', or ``.
*/
export async function main(ns) {
    // ns.ui.openTail();

    const [arrRaw, contractFileName, serverCoding] = ns.args;

    // If the input is a JSON string, parse it
    let arr;
    if (typeof arrRaw === "string") {
        arr = JSON.parse(arrRaw);
    } else {
        arr = arrRaw;
    }

    ns.print(`Array: ${arr}`);

    const minJumps = calculateMinJumps(arr);
    ns.print(`Minimum Jumps: ${minJumps}`);

    const reward = ns.codingcontract.attempt(minJumps.toString(), contractFileName, serverCoding);
    if (reward) {
        ns.tprint(`\u001b[32mSolved ${contractFileName} on ${serverCoding}: ${reward}\u001b[0m`);
    } else {
        ns.tprint(`\u001b[31mFailed to solve ${contractFileName} on ${serverCoding}\u001b[0m`);
    }
}

function calculateMinJumps(arr) {
    const n = arr.length;
    if (n === 0 || arr[0] === 0) return 0;

    let jumps = 0;
    let currentEnd = 0;
    let farthest = 0;

    for (let i = 0; i < n; i++) {
        farthest = Math.max(farthest, i + arr[i]);
        if (i === currentEnd) {
            jumps++;
            currentEnd = farthest;
            if (currentEnd >= n - 1) break;
        }
    }

    return currentEnd >= n - 1 ? jumps : 0;
}
