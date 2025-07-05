/*
Find All Valid Math Expressions
You are attempting to solve a Coding Contract. You have 10 tries remaining, after which the contract will self-destruct.


You are given the following string which contains only digits between 0 and 9:

525664176751

You are also given a target number of 12. Return all possible ways you can add the +(add), -(subtract), and *(multiply) operators to the string such that it evaluates to the target number. (Normal order of operations applies.)

The provided answer should be an array of strings containing the valid expressions. The data provided by this problem is an array with two elements. The first element is the string of digits, while the second element is the target number:

["525664176751", 12]

NOTE: The order of evaluation expects script operator precedence.
NOTE: Numbers in the expression cannot have leading 0's. In other words, "1+01" is not a valid expression.

Examples:

Input: digits = "123", target = 6
Output: ["1+2+3", "1*2*3"]

Input: digits = "105", target = 5
Output: ["1*0+5", "10-5"]


If your solution is an empty string, you must leave the text box empty. Do not use "", '', or ``.

*/

export async function main(ns) {
    const [input, contractFileName, serverCoding] = ns.args;
    const [digits, target] = JSON.parse(input);

    ns.print(`Digits: ${digits}, Target: ${target}`);

    const results = [];
    dfs(results, digits, target, '', 0, 0, 0);

    ns.print(`Valid Expressions: ${JSON.stringify(results)}`);

    const reward = ns.codingcontract.attempt(JSON.stringify(results), contractFileName, serverCoding);
    if (reward) {
        ns.tprint(`\u001b[32mSolved ${contractFileName} on ${serverCoding}: ${reward}\u001b[0m`);
    } else {
        ns.tprint(`\u001b[31mFailed to solve ${contractFileName} on ${serverCoding}\u001b[0m`);
    }
}

function dfs(results, digits, target, path, index, evalValue, prevOperand) {
    if (index === digits.length) {
        if (evalValue === target) {
            results.push(path);
        }
        return;
    }

    for (let i = index; i < digits.length; i++) {
        // Skip numbers with leading zero
        if (i !== index && digits[index] === '0') break;

        const part = digits.substring(index, i + 1);
        const num = parseInt(part);

        if (index === 0) {
            // First number, no operator
            dfs(results, digits, target, part, i + 1, num, num);
        } else {
            // Try +
            dfs(results, digits, target, path + '+' + part, i + 1, evalValue + num, num);
            // Try -
            dfs(results, digits, target, path + '-' + part, i + 1, evalValue - num, -num);
            // Try *
            dfs(results, digits, target, path + '*' + part, i + 1,
                evalValue - prevOperand + prevOperand * num,
                prevOperand * num);
        }
    }
}
