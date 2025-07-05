/*
Total Ways to Sum II
You are attempting to solve a Coding Contract. You have 10 tries remaining, after which the contract will self-destruct.


How many different distinct ways can the number 198 be written as a sum of integers contained in the set:

[1,2,3,4,6,7,8,11,12,13,15]?

You may use each integer in the set zero or more times.


If your solution is an empty string, you must leave the text box empty. Do not use "", '', or ``.
*/

export async function main(ns) {
    const [rawInput, contractFileName, serverCoding] = ns.args;

    const [targetSum, set] = JSON.parse(rawInput);

    const result = countWaysToSum(set, targetSum);
    ns.print(`Total Ways to Sum: ${result}`);

    const reward = ns.codingcontract.attempt(result.toString(), contractFileName, serverCoding);
    if (reward) {
        ns.tprint(`\u001b[32mSolved ${contractFileName} on ${serverCoding}: ${reward}\u001b[0m`);
    } else {
        ns.tprint(`\u001b[31mFailed to solve ${contractFileName} on ${serverCoding}\u001b[0m`);
    }
}

function countWaysToSum(set, target) {
    const dp = Array(target + 1).fill(0);
    dp[0] = 1;

    for (const num of set) {
        for (let i = num; i <= target; i++) {
            dp[i] += dp[i - num];
        }
    }

    return dp[target];
}
