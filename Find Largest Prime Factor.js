/**
 * # Find Largest Prime Factor
# You are attempting to solve a Coding Contract. You have 10 tries remaining, after which the contract will self-destruct.


# A prime factor is a factor that is a prime number. What is the largest prime factor of x?


# If your solution is an empty string, you must leave the text box empty. Do not use "", '', or ``.

 */


/** @param {NS} ns */
export async function main(ns) {
    ns.tail();
 
    let x = ns.args[0];
    ns.print(x);
 
    let result = largestPrimeFactor(x);
 
    // Nom du fichier de contrat et serveur de codage
    let contractFileName = ns.args[1];
    let serverCoding = ns.args[2];
 
    ns.codingcontract.attempt(result,contractFileName,serverCoding);
 
    function largestPrimeFactor(x) {
       let largestPrime = 1;
       let i = 2;
       while (i * i <= x) { // check until the square root of x
          if (x % i) { // check if i is a factor of x
                // We do if (x % i) because if x % i == 0, then i is a factor of x, and will not pass the condition
                i += 1; // increment i if it is not a factor
          } else {
                x = Math.floor(x / i);
                largestPrime = i;
          }
       }
       if (x > 1) {
          largestPrime = x;
       }
       return largestPrime;
    }
 }