/**
 Given an array of intervals, merge all overlapping intervals. An interval
is an array with two numbers, where the first number is always less than
the second (e.g. [1, 5]).

The intervals must be returned in ASCENDING order.

Example:
[[1, 3], [8, 10], [2, 6], [10, 16]]
merges into [[1, 6], [8, 16]]
 */

/** @param {NS} ns */
export async function main(ns) {
    ns.tail();
    let intervalstring = ns.args[0];
 
    // intervals étant un string, on doit le convertir en array :
    //Exemple : intervals = "[[1,3],[2,8],[9,10],[9,15]]"
 
    intervalstring = intervalstring.slice(2, -2);
    //1,3],[2,8],[9,10],[9,15
 
    let inter = intervalstring.split('],[');
    //1,3  =  inter[0]
    //2,8  =  inter[1]
    //9,10 =  inter[2]
    //9,15 =  inter[3]
 
    let intervals = [];
 
    for (let i = 0; i < inter.length; i++) {
       let split = inter[i].split(',');
       intervals.push([Number(split[0]), Number(split[1])]);
    }
 
    //Trie les intervalles basé sur leur premier chiffre
    intervals.sort((a, b) => a[0] - b[0]);
 
    //Initie un array pour stocker les intervalles mergés
    let mergedIntervals = [];
 
    // Iterate through the intervals
    for (let interval of intervals) {
       // If the merged list is empty or the current interval does not overlap
       // with the previous interval, add the current interval to the merged list
       if (mergedIntervals.length === 0 || interval[0] > mergedIntervals[mergedIntervals.length - 1][1]) {
          mergedIntervals.push(interval);
       } else {
          // If the current interval overlaps with the previous interval,
          // merge the intervals by updating the end time of the previous interval
          mergedIntervals[mergedIntervals.length - 1][1] = Math.max(mergedIntervals[mergedIntervals.length - 1][1], interval[1]);
       }
    }
 
    ns.print("ancien intervalle : " + JSON.stringify(intervals) + "\nmergedIntervals : " + JSON.stringify(mergedIntervals));
 
    let contractFileName = ns.args[1];
 
    let serverCoding = ns.args[2];
 
    ns.print(JSON.stringify(mergedIntervals)+" "+contractFileName+" "+serverCoding);
 
 
    ns.print(ns.codingcontract.attempt(JSON.stringify(mergedIntervals),contractFileName,serverCoding));
 }