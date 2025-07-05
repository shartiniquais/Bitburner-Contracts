/*
Algorithmic Stock Trader I
You are attempting to solve a Coding Contract. You have 5 tries remaining, after which the contract will self-destruct.


You are given the following array of stock prices (which are numbers) where the i-th element represents the stock price on day i:

119,139,129,123,119,14,125,78,187,11,111,62,53,52,83,129

Determine the maximum possible profit you can earn using at most one transaction (i.e. you can only buy and sell the stock once). If no profit can be made then the answer should be 0. Note that you have to buy the stock before you can sell it.


If your solution is an empty string, you must leave the text box empty. Do not use "", '', or ``.
*/
export async function main(ns) {
    const [input, contractFileName, serverCoding] = ns.args;

    // Parse the input string into an array of integers
    const prices = input.slice(1, -1).split(',').map(Number);

    // Calculate the maximum profit
    const maxProfit = calculateMaxProfit(prices);
    ns.print(`Maximum Profit: ${maxProfit}`);

    // Attempt to solve the contract
    const reward = ns.codingcontract.attempt(maxProfit.toString(), contractFileName, serverCoding);
    if (reward) {
        ns.tprint(`\u001b[32mSolved ${contractFileName} on ${serverCoding}: ${reward}\u001b[0m`);
    } else {
        ns.tprint(`\u001b[31mFailed to solve ${contractFileName} on ${serverCoding}\u001b[0m`);
    }
}

function calculateMaxProfit(prices) {
    let maxProfit = 0;
    let minPrice = Infinity;

    for (const price of prices) {
        minPrice = Math.min(minPrice, price);
        maxProfit = Math.max(maxProfit, price - minPrice);
    }

    return maxProfit;
}
