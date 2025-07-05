/*

Sanitize Parentheses in Expression
You are attempting to solve a Coding Contract. You have 10 tries remaining, after which the contract will self-destruct.


Given the following string:

)a))((

remove the minimum number of invalid parentheses in order to validate the string. If there are multiple minimal ways to validate the string, provide all of the possible results. The answer should be provided as an array of strings. If it is impossible to validate the string the result should be an array with only an empty string.

IMPORTANT: The string may contain letters, not just parentheses.

Examples:

"()())()" -> ["()()()", "(())()"]
"(a)())()" -> ["(a)()()", "(a())()"]
")(" -> [""]


If your solution is an empty string, you must leave the text box empty. Do not use "", '', or ``.
*/

export async function main(ns) {
    const [expression, contractFileName, serverCoding] = ns.args;

    const expr = JSON.parse(expression); // <- important
    ns.print(`Expression: ${expr}`);

    const results = sanitizeParentheses(expr);
    ns.print(`Sanitized Results: ${JSON.stringify(results)}`);

    const reward = ns.codingcontract.attempt(JSON.stringify(results), contractFileName, serverCoding);
    if (reward) {
        ns.tprint(`\u001b[32mSolved ${contractFileName} on ${serverCoding}: ${reward}\u001b[0m`);
    } else {
        ns.tprint(`\u001b[31mFailed to solve ${contractFileName} on ${serverCoding}\u001b[0m`);
    }
}


function sanitizeParentheses(s) {
    const isValid = (str) => {
        let balance = 0;
        for (const c of str) {
            if (c === '(') balance++;
            else if (c === ')') {
                if (--balance < 0) return false;
            }
        }
        return balance === 0;
    };

    const result = [];
    const visited = new Set();
    const queue = [s];
    let found = false;

    while (queue.length > 0) {
        const current = queue.shift();
        if (visited.has(current)) continue;
        visited.add(current);

        if (isValid(current)) {
            result.push(current);
            found = true;
        }

        if (found) continue; // Only collect minimal solutions

        for (let i = 0; i < current.length; i++) {
            if (current[i] !== '(' && current[i] !== ')') continue;
            const next = current.slice(0, i) + current.slice(i + 1);
            queue.push(next);
        }
    }

    return result.length > 0 ? result : [""];
}
