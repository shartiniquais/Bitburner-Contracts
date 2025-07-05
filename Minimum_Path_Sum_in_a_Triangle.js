/*
Minimum Path Sum in a Triangle
You are attempting to solve a Coding Contract. You have 10 tries remaining, after which the contract will self-destruct.


Given a triangle, find the minimum path sum from top to bottom. In each step of the path, you may only move to adjacent numbers in the row below. The triangle is represented as a 2D array of numbers:

[
    [8],
   [5,5],
  [3,8,7]
]

Example: If you are given the following triangle:

[
     [2],
    [3,4],
   [6,5,7],
  [4,1,8,3]
]

The minimum path sum is 11 (2 -> 3 -> 5 -> 1).


If your solution is an empty string, you must leave the text box empty. Do not use "", '', or ``.
*/

export async function main(ns) {
    const [rawInput, contractFileName, serverCoding] = ns.args;
    const triangle = JSON.parse(rawInput);

    ns.print(`Triangle: ${JSON.stringify(triangle)}`);

    const minPathSum = findMinPathSum(triangle);
    ns.print(`Minimum Path Sum: ${minPathSum}`);

    const reward = ns.codingcontract.attempt(minPathSum.toString(), contractFileName, serverCoding);
    if (reward) {
        ns.tprint(`\u001b[32mSolved ${contractFileName} on ${serverCoding}: ${reward}\u001b[0m`);
    } else {
        ns.tprint(`\u001b[31mFailed to solve ${contractFileName} on ${serverCoding}\u001b[0m`);
    }
}

function findMinPathSum(triangle) {
    const rows = triangle.length;
    for (let r = rows - 2; r >= 0; r--) {
        for (let c = 0; c <= r; c++) {
            triangle[r][c] += Math.min(triangle[r + 1][c], triangle[r + 1][c + 1]);
        }
    }
    return triangle[0][0];
}