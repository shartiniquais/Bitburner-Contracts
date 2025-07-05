/*
Total Ways to Sum
You are attempting to solve a Coding Contract. You have 10 tries remaining, after which the contract will self-destruct.


It is possible write four as a sum in exactly four different ways:

    3 + 1
    2 + 2
    2 + 1 + 1
    1 + 1 + 1 + 1

How many different distinct ways can the number 85 be written as a sum of at least two positive integers?


If your solution is an empty string, you must leave the text box empty. Do not use "", '', or ``.
*/

export async function main(ns) {
    //ns.ui.openTail();
  
    const [input, contractFileName, serverCoding] = ns.args;
    const num = parseInt(input);
  
    const ways = countWays(num);

    const reward = ns.codingcontract.attempt(ways.toString(), contractFileName, serverCoding);
    if (reward) {
        ns.tprint(`\u001b[32mSolved ${contractFileName} on ${serverCoding}: ${reward}\u001b[0m`);
    } else {
        ns.tprint(`\u001b[31mFailed to solve ${contractFileName} on ${serverCoding}\u001b[0m`);
    }
}

function countWays(num) {
    const dp = new Array(num + 1).fill(0);
    dp[0] = 1;

    for (let i = 1; i <= num; i++) {
        for (let j = i; j <= num; j++) {
            dp[j] += dp[j - i];
        }
    }
    return dp[num] - 1; // Subtract 1 to exclude the case of using the number itself
}