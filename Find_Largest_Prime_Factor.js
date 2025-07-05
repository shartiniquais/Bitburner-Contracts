/*
Find Largest Prime Factor
You are attempting to solve a Coding Contract. You have 10 tries remaining, after which the contract will self-destruct.


A prime factor is a factor that is a prime number. What is the largest prime factor of 797384550?


If your solution is an empty string, you must leave the text box empty. Do not use "", '', or ``.
*/
export async function main(ns) {
    // ns.ui.openTail();

    const [numberRaw, contractFileName, serverCoding] = ns.args;

    // If the input is a JSON string, parse it
    let number;
    if (typeof numberRaw === "string") {
        number = JSON.parse(numberRaw);
    } else {
        number = numberRaw;
    }

    ns.print(`Number: ${number}`);

    const largestPrimeFactor = findLargestPrimeFactor(number);
    ns.print(`Largest Prime Factor: ${largestPrimeFactor}`);

    const reward = ns.codingcontract.attempt(largestPrimeFactor.toString(), contractFileName, serverCoding);
    if (reward) {
        ns.tprint(`\u001b[32mSolved ${contractFileName} on ${serverCoding}: ${reward}\u001b[0m`);
    } else {
        ns.tprint(`\u001b[31mFailed to solve ${contractFileName} on ${serverCoding}\u001b[0m`);
    }
}

function findLargestPrimeFactor(number) {
    let largestFactor = 1;
    for (let i = 2; i <= Math.sqrt(number); i++) {
        while (number % i === 0) {
            largestFactor = i;
            number /= i;
        }
    }
    return number > 1 ? number : largestFactor;
}
