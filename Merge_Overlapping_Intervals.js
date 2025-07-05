/*

Merge Overlapping Intervals
You are attempting to solve a Coding Contract. You have 15 tries remaining, after which the contract will self-destruct.


Given the following array of arrays of numbers representing a list of intervals, merge all overlapping intervals.

[[14,24],[9,14],[18,24],[6,15],[15,24],[11,16],[16,25],[11,19],[13,17],[4,10],[8,13],[18,19],[25,33],[15,23],[25,28],[10,16],[12,19],[11,13]]

Example:

[[1, 3], [8, 10], [2, 6], [10, 16]]

would merge into [[1, 6], [8, 16]].

The intervals must be returned in ASCENDING order. You can assume that in an interval, the first number will always be smaller than the second.


If your solution is an empty string, you must leave the text box empty. Do not use "", '', or ``.
*/

export async function main(ns) {
    //ns.ui.openTail();

    let [input, contractFileName, serverCoding] = ns.args;
    input = JSON.parse(input);

    ns.print(`Input: ${JSON.stringify(input)}`);

    const mergedIntervals = mergeOverlappingIntervals(input);
    ns.print(`Merged Intervals: ${JSON.stringify(mergedIntervals)}`);

    const reward = ns.codingcontract.attempt(JSON.stringify(mergedIntervals), contractFileName, serverCoding);
    if (reward) {
        ns.tprint(`\u001b[32mSolved ${contractFileName} on ${serverCoding}: ${reward}\u001b[0m`);
    } else {
        ns.tprint(`\u001b[31mFailed to solve ${contractFileName} on ${serverCoding}\u001b[0m`);
    }
}

function mergeOverlappingIntervals(intervals) {
    if (intervals.length === 0) return [];

    intervals.sort((a, b) => a[0] - b[0]);

    const merged = [];
    let currentInterval = intervals[0];

    for (let i = 1; i < intervals.length; i++) {
        const nextInterval = intervals[i];

        // If the current interval overlaps with the next one, merge them
        if (currentInterval[1] >= nextInterval[0]) {
            currentInterval[1] = Math.max(currentInterval[1], nextInterval[1]);
        } else {
            // No overlap, push the current interval and move to the next
            merged.push(currentInterval);
            currentInterval = nextInterval;
        }
    }

    // Push the last interval
    merged.push(currentInterval);

    return merged;
}