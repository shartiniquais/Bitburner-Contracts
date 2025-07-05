/*
Algorithmic Stock Trader IV
You are attempting to solve a Coding Contract. You have 10 tries remaining, after which the contract will self-destruct.


You are given the following array with two elements:

[5, [86,124,51,27,10,35,51,62,68]]

The first element is an integer k. The second element is an array of stock prices (which are numbers) where the i-th element represents the stock price on day i.

Determine the maximum possible profit you can earn using at most k transactions. A transaction is defined as buying and then selling one share of the stock. Note that you cannot engage in multiple transactions at once. In other words, you must sell the stock before you can buy it again.

If no profit can be made, then the answer should be 0.


If your solution is an empty string, you must leave the text box empty. Do not use "", '', or ``.
*/

export async function main(ns) {
    const [dataRaw, contractFileName, serverCoding] = ns.args;
    const [k, prices] = JSON.parse(dataRaw);

    ns.print(`k: ${k}`);
    ns.print(`Prices: ${JSON.stringify(prices)}`);

    const maxProfit = maxProfitWithKTransactions(k, prices);
    ns.print(`Max Profit: ${maxProfit}`);

    const reward = ns.codingcontract.attempt(maxProfit.toString(), contractFileName, serverCoding);
    if (reward) {
        ns.tprint(`\u001b[32mSolved ${contractFileName} on ${serverCoding}: ${reward}\u001b[0m`);
    } else {
        ns.tprint(`\u001b[31mFailed to solve ${contractFileName} on ${serverCoding}\u001b[0m`);
    }
}

function maxProfitWithKTransactions(k, prices) {
    const n = prices.length;
    if (n === 0 || k === 0) return 0;
    // If k >= n/2, we can make unlimited transactions
    if (k >= n / 2) {
        let profit = 0;
        for (let i = 1; i < n; i++) {
            if (prices[i] > prices[i - 1]) profit += prices[i] - prices[i - 1];
        }
        return profit;
    }
    // DP table: dp[t][d] = max profit up to day d with at most t transactions
    const dp = Array.from({ length: k + 1 }, () => Array(n).fill(0));
    for (let t = 1; t <= k; t++) {
        let maxDiff = -prices[0];
        for (let d = 1; d < n; d++) {
            // Either don't trade today, or sell today (buy on a previous day)
            dp[t][d] = Math.max(dp[t][d - 1], prices[d] + maxDiff);
            // Update maxDiff for the next day
            maxDiff = Math.max(maxDiff, dp[t - 1][d] - prices[d]);
        }
    }
    return dp[k][n - 1];
}


