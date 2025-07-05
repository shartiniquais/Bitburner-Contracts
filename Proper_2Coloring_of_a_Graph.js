/*

Proper 2-Coloring of a Graph
You are attempting to solve a Coding Contract. You have 5 tries remaining, after which the contract will self-destruct.


You are given the following data, representing a graph:
[11,[[0,8],[1,3],[0,10],[4,10],[7,10],[1,6],[5,6],[1,9],[1,10],[4,9],[0,3],[2,4],[1,8],[0,9],[1,2],[2,7]]]
Note that "graph", as used here, refers to the field of graph theory, and has no relation to statistics or plotting. The first element of the data represents the number of vertices in the graph. Each vertex is a unique number between 0 and 10. The next element of the data represents the edges of the graph. Two vertices u,v in a graph are said to be adjacent if there exists an edge [u,v]. Note that an edge [u,v] is the same as an edge [v,u], as order does not matter. You must construct a 2-coloring of the graph, meaning that you have to assign each vertex in the graph a "color", either 0 or 1, such that no two adjacent vertices have the same color. Submit your answer in the form of an array, where element i represents the color of vertex i. If it is impossible to construct a 2-coloring of the given graph, instead submit an empty array.

Examples:

Input: [4, [[0, 2], [0, 3], [1, 2], [1, 3]]]
Output: [0, 0, 1, 1]

Input: [3, [[0, 1], [0, 2], [1, 2]]]
Output: []


If your solution is an empty string, you must leave the text box empty. Do not use "", '', or ``.
*/
export async function main(ns) {
    const [dataRaw, contractFileName, serverCoding] = ns.args;

    // If the input is a JSON string, parse it
    let data;
    if (typeof dataRaw === "string") {
        data = JSON.parse(dataRaw);
    } else {
        data = dataRaw;
    }

    const result = proper2Coloring(data);
    ns.print(`2-Coloring Result: ${JSON.stringify(result)}`);

    const reward = ns.codingcontract.attempt(JSON.stringify(result), contractFileName, serverCoding);
    if (reward) {
        ns.tprint(`\u001b[32mSolved ${contractFileName} on ${serverCoding}: ${reward}\u001b[0m`);
    } else {
        ns.tprint(`\u001b[31mFailed to solve ${contractFileName} on ${serverCoding}\u001b[0m`);
    }
}

function proper2Coloring(data) {
    const n = data[0];
    const edges = data[1];

    // Create adjacency list
    const graph = Array.from({ length: n }, () => []);
    for (const [u, v] of edges) {
        graph[u].push(v);
        graph[v].push(u);
    }

    const colors = Array(n).fill(-1); // -1 means uncolored

    function dfs(node, color) {
        if (colors[node] !== -1) {
            return colors[node] === color; // Check if already colored correctly
        }
        colors[node] = color;

        for (const neighbor of graph[node]) {
            if (!dfs(neighbor, 1 - color)) {
                return false; // If any neighbor fails, return false
            }
        }
        return true;
    }

    for (let i = 0; i < n; i++) {
        if (colors[i] === -1 && !dfs(i, 0)) {
            return []; // If coloring fails, return empty array
        }
    }

    return colors;
}