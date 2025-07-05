/*
Encryption I: Caesar Cipher
You are attempting to solve a Coding Contract. You have 10 tries remaining, after which the contract will self-destruct.


Caesar cipher is one of the simplest encryption technique. It is a type of substitution cipher in which each letter in the plaintext is replaced by a letter some fixed number of positions down the alphabet. For example, with a left shift of 3, D would be replaced by A, E would become B, and A would become X (because of rotation).

You are given an array with two elements:
  ["CLOUD MACRO SHIFT ENTER TRASH", 19]
The first element is the plaintext, the second element is the left shift value.

Return the ciphertext as uppercase string. Spaces remains the same.

If your solution is an empty string, you must leave the text box empty. Do not use "", '', or ``.
*/

export async function main(ns) {
  //ns.ui.openTail();

  const [rawInput, contractFileName, serverCoding] = ns.args;
  const [input, shift] = JSON.parse(rawInput);

  ns.print(`Input: ${input}`);
  ns.print(`Shift: ${shift}`);

  const ciphertext = caesarCipher(input, shift);

  ns.print(`Ciphertext: ${ciphertext}`);

  const reward = ns.codingcontract.attempt(ciphertext, contractFileName, serverCoding);
  if (reward) {
        ns.tprint(`\u001b[32mSolved ${contractFileName} on ${serverCoding}: ${reward}\u001b[0m`);
    } else {
        ns.tprint(`\u001b[31mFailed to solve ${contractFileName} on ${serverCoding}\u001b[0m`);
    }
}

function caesarCipher(text, shift) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === " ") {
      result += " ";
      continue;
    }
    const index = alphabet.indexOf(char);
    const newIndex = (index - shift + 26) % 26;
    result += alphabet[newIndex];
  }

  return result;
}
