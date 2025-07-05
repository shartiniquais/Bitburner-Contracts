/*

Shortest Path in a Grid
You are attempting to solve a Coding Contract. You have 10 tries remaining, after which the contract will self-destruct.


You are located in the top-left corner of the following grid:

  [[0,1,0,1,0,0,0,1,0,1],
   [0,0,0,0,0,0,0,0,1,1],
   [0,0,0,0,0,0,1,1,1,1],
   [0,1,0,1,1,1,0,0,0,0],
   [1,0,0,0,0,1,0,1,1,1],
   [1,0,0,0,0,0,1,1,0,1],
   [1,1,0,0,0,0,0,0,0,0],
   [0,0,0,1,1,0,1,0,1,0],
   [0,0,1,0,1,0,0,0,1,0],
   [0,0,0,0,0,1,0,1,0,0],
   [0,0,0,0,0,0,0,0,0,0]]

You are trying to find the shortest path to the bottom-right corner of the grid, but there are obstacles on the grid that you cannot move onto. These obstacles are denoted by '1', while empty spaces are denoted by 0.

Determine the shortest path from start to finish, if one exists. The answer should be given as a string of UDLR characters, indicating the moves along the path

NOTE: If there are multiple equally short paths, any of them is accepted as answer. If there is no path, the answer should be an empty string.
NOTE: The data returned for this contract is an 2D array of numbers representing the grid.

Examples:

    [[0,1,0,0,0],
     [0,0,0,1,0]]

Answer: 'DRRURRD'

    [[0,1],
     [1,0]]

Answer: ''


If your solution is an empty string, you must leave the text box empty. Do not use "", '', or ``.
*/

export async function main(ns) {
    //ns.ui.openTail();

    const [gridRaw, contractFileName, serverCoding] = ns.args;
    const grid = JSON.parse(gridRaw);

    ns.print(`Grid: ${JSON.stringify(grid)}`);

    const path = findShortestPath(grid);
    ns.print(`Shortest Path: ${path}`);

    const reward = ns.codingcontract.attempt(path, contractFileName, serverCoding);
    if (reward) {
        ns.tprint(`\u001b[32mSolved ${contractFileName} on ${serverCoding}: ${reward}\u001b[0m`);
    } else {
        ns.tprint(`\u001b[31mFailed to solve ${contractFileName} on ${serverCoding}\u001b[0m`);
    }
}

function findShortestPath(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    const directions = [[1, 0, 'D'], [0, 1, 'R'], [-1, 0, 'U'], [0, -1, 'L']];
    const queue = [[0, 0, '']];
    const visited = new Set();
    visited.add('0,0');

    while (queue.length > 0) {
        const [x, y, path] = queue.shift();

        if (x === rows - 1 && y === cols - 1) {
            return path; // Reached the bottom-right corner
        }

        for (const [dx, dy, dir] of directions) {
            const nx = x + dx;
            const ny = y + dy;

            if (nx >= 0 && nx < rows && ny >= 0 && ny < cols && grid[nx][ny] === 0) {
                const key = `${nx},${ny}`;
                if (!visited.has(key)) {
                    visited.add(key);
                    queue.push([nx, ny, path + dir]);
                }
            }
        }
    }

    return ''; // No path found
}