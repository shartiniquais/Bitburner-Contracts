/*
Algorithmic Stock Trader III
You are attempting to solve a Coding Contract. You have 10 tries remaining, after which the contract will self-destruct.


You are given the following array of stock prices (which are numbers) where the i-th element represents the stock price on day i:

146,144,50,190,44,179,99,4,91,74,54,132,33,18,191,119,194,79,126,46,38,200,176,135,147,196,102,124,58,128,45,52,48,118,115,57,93,41,177,24,54

Determine the maximum possible profit you can earn using at most two transactions. A transaction is defined as buying and then selling one share of the stock. Note that you cannot engage in multiple transactions at once. In other words, you must sell the stock before you buy it again.

If no profit can be made, then the answer should be 0.


If your solution is an empty string, you must leave the text box empty. Do not use "", '', or ``.
*/

export async function main(ns) {
    const [pricesRaw, contractFileName, serverCoding] = ns.args;
    const prices = JSON.parse(pricesRaw);

    ns.print(`Prices: ${prices}`);

    const maxProfit = maxProfitTwoTransactions(prices);
    ns.print(`Maximum Profit: ${maxProfit}`);

    const reward = ns.codingcontract.attempt(maxProfit.toString(), contractFileName, serverCoding);
    if (reward) {
        ns.tprint(`\u001b[32mSolved ${contractFileName} on ${serverCoding}: ${reward}\u001b[0m`);
    } else {
        ns.tprint(`\u001b[31mFailed to solve ${contractFileName} on ${serverCoding}\u001b[0m`);
    }
}

function maxProfitTwoTransactions(prices) {
    const n = prices.length;
    if (n <= 1) return 0;

    const leftProfits = Array(n).fill(0); // Max profit if we sell at or before day i
    const rightProfits = Array(n + 1).fill(0); // Max profit if we buy at or after day i

    // Left pass: max profit from day 0 to i
    let minPrice = prices[0];
    for (let i = 1; i < n; i++) {
        minPrice = Math.min(minPrice, prices[i]);
        leftProfits[i] = Math.max(leftProfits[i - 1], prices[i] - minPrice);
    }

    // Right pass: max profit from day i to end
    let maxPrice = prices[n - 1];
    for (let i = n - 2; i >= 0; i--) {
        maxPrice = Math.max(maxPrice, prices[i]);
        rightProfits[i] = Math.max(rightProfits[i + 1], maxPrice - prices[i]);
    }

    // Combine both: one transaction before i, one after
    let maxProfit = 0;
    for (let i = 0; i < n; i++) {
        maxProfit = Math.max(maxProfit, leftProfits[i] + rightProfits[i + 1]);
    }

    return maxProfit;
}
