/*
Spiralize Matrix
You are attempting to solve a Coding Contract. You have 10 tries remaining, after which the contract will self-destruct.


Given the following array of arrays of numbers representing a 2D matrix, return the elements of the matrix as an array in spiral order:

    [
        [36, 4,43, 8,16,27, 7,31,35,22,14]
        [45,50,37,18, 9,22,46,47,36,37,46]
        [47,10,39,22, 4,16,23,12,45,22,46]
        [17,49,43,35, 1,19, 7,12,46,32,35]
        [ 5, 7,26,41, 2,38,42,32,23,17, 4]
        [13, 6,36, 5,21,48,29, 6,16,40,43]
        [30,11,41,31,29,48, 8,17,23,23,14]
        [11,11, 3,34, 7, 9,46,30, 8,44,29]
        [ 2,41,50,23,11,24, 1, 8,35,32, 4]
        [24,43,31,14,29,44,26,28,32,32,23]
        [34,11, 1,15,45,18,14,33, 4, 5, 4]
        [44,12,46, 9,33,45,33, 6,40, 9,14]
        [ 4,30,13,22, 1,32,23,27,28, 7,38]
        [ 5,49, 1,31,29,28,30, 8, 1,20,10]
        [25,36, 7,48,25,35,16,28,17,32, 1]
    ]

Here is an example of what spiral order should be:

    [
        [1, 2, 3]
        [4, 5, 6]
        [7, 8, 9]
    ]

Answer: [1, 2, 3, 6, 9, 8 ,7, 4, 5]

Note that the matrix will not always be square:

    [
        [1,  2,  3,  4]
        [5,  6,  7,  8]
        [9, 10, 11, 12]
    ]

Answer: [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]


If your solution is an empty string, you must leave the text box empty. Do not use "", '', or ``.

*/

export async function main(ns) {
    const [matrixRaw, contractFileName, serverCoding] = ns.args;

    // If the input is a JSON string, parse it
    let matrix;
    if (typeof matrixRaw === "string") {
        matrix = JSON.parse(matrixRaw);
    } else {
        matrix = matrixRaw;
    }

    ns.print(`Matrix: ${JSON.stringify(matrix)}`);

    const spiralOrder = getSpiralOrder(matrix);
    ns.print(`Spiral Order: ${JSON.stringify(spiralOrder)}`);

    const reward = ns.codingcontract.attempt(JSON.stringify(spiralOrder), contractFileName, serverCoding);
    if (reward) {
        ns.tprint(`\u001b[32mSolved ${contractFileName} on ${serverCoding}: ${reward}\u001b[0m`);
    } else {
        ns.tprint(`\u001b[31mFailed to solve ${contractFileName} on ${serverCoding}\u001b[0m`);
    }
}

function getSpiralOrder(matrix) {
    if (matrix.length === 0) return [];

    const result = [];
    let top = 0;
    let bottom = matrix.length - 1;
    let left = 0;
    let right = matrix[0].length - 1;

    while (top <= bottom && left <= right) {
        // Traverse from left to right
        for (let i = left; i <= right; i++) {
            result.push(matrix[top][i]);
        }
        top++;

        // Traverse from top to bottom
        for (let i = top; i <= bottom; i++) {
            result.push(matrix[i][right]);
        }
        right--;

        if (top <= bottom) {
            // Traverse from right to left
            for (let i = right; i >= left; i--) {
                result.push(matrix[bottom][i]);
            }
            bottom--;
        }

        if (left <= right) {
            // Traverse from bottom to top
            for (let i = bottom; i >= top; i--) {
                result.push(matrix[i][left]);
            }
            left++;
        }
    }

    return result;
}