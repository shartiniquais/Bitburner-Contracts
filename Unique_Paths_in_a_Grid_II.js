/*
Unique Paths in a Grid II
You are attempting to solve a Coding Contract. You have 10 tries remaining, after which the contract will self-destruct.


You are located in the top-left corner of the following grid:

0,0,0,0,0,0,0,0,0,1,1,0,
0,0,1,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,1,0,0,
0,0,0,0,1,0,0,0,0,0,0,0,
0,0,1,1,0,0,0,0,0,0,0,0,
0,0,0,1,0,0,0,1,0,1,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,
1,0,0,0,1,0,0,0,0,0,0,1,
0,0,0,0,0,0,0,0,0,0,0,0,

You are trying reach the bottom-right corner of the grid, but you can only move down or right on each step. Furthermore, there are obstacles on the grid that you cannot move onto. These obstacles are denoted by '1', while empty spaces are denoted by 0.

Determine how many unique paths there are from start to finish.

NOTE: The data returned for this contract is an 2D array of numbers representing the grid.


If your solution is an empty string, you must leave the text box empty. Do not use "", '', or ``.
*/

export async function main(ns) {
    //ns.ui.openTail();

    const [gridRaw, contractFileName, serverCoding] = ns.args;
    const grid = JSON.parse(gridRaw);

    ns.print(`Grid: ${JSON.stringify(grid)}`);

    const uniquePaths = countUniquePaths(grid);
    ns.print(`Unique Paths: ${uniquePaths}`);

    const reward = ns.codingcontract.attempt(uniquePaths.toString(), contractFileName, serverCoding);
    if (reward) {
        ns.tprint(`\u001b[32mSolved ${contractFileName} on ${serverCoding}: ${reward}\u001b[0m`);
    } else {
        ns.tprint(`\u001b[31mFailed to solve ${contractFileName} on ${serverCoding}\u001b[0m`);
    }
}

function countUniquePaths(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    const dp = Array.from({ length: rows }, () => Array(cols).fill(0));

    // Start from the top-left corner
    dp[0][0] = grid[0][0] === 0 ? 1 : 0;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === 1) {
                dp[i][j] = 0; // No paths through obstacles
            } else {
                if (i > 0) dp[i][j] += dp[i - 1][j]; // From above
                if (j > 0) dp[i][j] += dp[i][j - 1]; // From left
            }
        }
    }

    return dp[rows - 1][cols - 1];
}