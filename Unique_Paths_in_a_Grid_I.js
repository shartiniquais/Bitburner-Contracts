/*

Unique Paths in a Grid I
You are attempting to solve a Coding Contract. You have 10 tries remaining, after which the contract will self-destruct.


You are in a grid with 2 rows and 4 columns, and you are positioned in the top-left corner of that grid. You are trying to reach the bottom-right corner of the grid, but you can only move down or right on each step. Determine how many unique paths there are from start to finish.

NOTE: The data returned for this contract is an array with the number of rows and columns:

[2, 4]


If your solution is an empty string, you must leave the text box empty. Do not use "", '', or ``.
*/

export async function main(ns) {
    // ns.ui.openTail();

    const [gridRaw, contractFileName, serverCoding] = ns.args;
    const [rows, cols] = JSON.parse(gridRaw);

    ns.print(`Grid: ${rows} rows, ${cols} columns`);

    const uniquePathsCount = calculateUniquePaths(rows, cols);
    ns.print(`Unique Paths Count: ${uniquePathsCount}`);

    const reward = ns.codingcontract.attempt(uniquePathsCount.toString(), contractFileName, serverCoding);
    if (reward) {
        ns.tprint(`\u001b[32mSolved ${contractFileName} on ${serverCoding}: ${reward}\u001b[0m`);
    } else {
        ns.tprint(`\u001b[31mFailed to solve ${contractFileName} on ${serverCoding}\u001b[0m`);
    }
}

function calculateUniquePaths(rows, cols) {
    const dp = Array.from({ length: rows }, () => Array(cols).fill(0));
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (i === 0 || j === 0) {
                dp[i][j] = 1;
            } else {
                dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
            }
        }
    }
    return dp[rows - 1][cols - 1];
}