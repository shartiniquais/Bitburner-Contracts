/*
Algorithmic Stock Trader II
You are attempting to solve a Coding Contract. You have 10 tries remaining, after which the contract will self-destruct.


You are given the following array of stock prices (which are numbers) where the i-th element represents the stock price on day i:

194,136,35,144,160,12,89,141,189,111,191,197,129,132,143,48,187,184,143,97,59

Determine the maximum possible profit you can earn using as many transactions as you'd like. A transaction is defined as buying and then selling one share of the stock. Note that you cannot engage in multiple transactions at once. In other words, you must sell the stock before you buy it again.

If no profit can be made, then the answer should be 0.


If your solution is an empty string, you must leave the text box empty. Do not use "", '', or ``.
*/

export async function main(ns) {
    // ns.ui.openTail();

    const [pricesRaw, contractFileName, serverCoding] = ns.args;

    // If the input is a JSON string, parse it
    let prices;
    if (typeof pricesRaw === "string") {
        prices = JSON.parse(pricesRaw);
    } else {
        prices = pricesRaw;
    }

    ns.print(`Prices: ${prices}`);

    const maxProfit = calculateMaxProfit(prices);
    ns.print(`Max Profit: ${maxProfit}`);

    const reward = ns.codingcontract.attempt(maxProfit.toString(), contractFileName, serverCoding);
    if (reward) {
        ns.tprint(`\u001b[32mSolved ${contractFileName} on ${serverCoding}: ${reward}\u001b[0m`);
    } else {
        ns.tprint(`\u001b[31mFailed to solve ${contractFileName} on ${serverCoding}\u001b[0m`);
    }
}

function calculateMaxProfit(prices) {
    let maxProfit = 0;
    for (let i = 1; i < prices.length; i++) {
        if (prices[i] > prices[i - 1]) {
            maxProfit += prices[i] - prices[i - 1];
        }
    }
    return maxProfit;
}