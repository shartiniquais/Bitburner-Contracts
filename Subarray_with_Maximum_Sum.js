/*
Subarray with Maximum Sum
You are attempting to solve a Coding Contract. You have 10 tries remaining, after which the contract will self-destruct.


Given the following integer array, find the contiguous subarray (containing at least one number) which has the largest sum and return that sum. 'Sum' refers to the sum of all the numbers in the subarray.
10,-2,-5,2,8,2,-5,-4,-6,-8,2,-1,-9,4,-1,10,-1,8,9,-9,-9,-1,2,-2,2,10,-1,2,3,2,-6,9,0,-3,8,1,-3,-8,2


If your solution is an empty string, you must leave the text box empty. Do not use "", '', or ``.
*/

export async function main(ns) {
    //ns.ui.openTail();

    const [dataRaw, contractFileName, serverCoding] = ns.args;
    const arr = JSON.parse(dataRaw);

    ns.print(`Array: ${JSON.stringify(arr)}`);

    const maxSum = maxSubArraySum(arr);
    ns.print(`Maximum Subarray Sum: ${maxSum}`);

    const reward = ns.codingcontract.attempt(maxSum.toString(), contractFileName, serverCoding);
    if (reward) {
        ns.tprint(`\u001b[32mSolved ${contractFileName} on ${serverCoding}: ${reward}\u001b[0m`);
    } else {
        ns.tprint(`\u001b[31mFailed to solve ${contractFileName} on ${serverCoding}\u001b[0m`);
    }
}

function maxSubArraySum(arr) {
    let maxSum = arr[0];
    let currentSum = arr[0];

    for (let i = 1; i < arr.length; i++) {
        currentSum = Math.max(arr[i], currentSum + arr[i]);
        maxSum = Math.max(maxSum, currentSum);
    }

    return maxSum;
}