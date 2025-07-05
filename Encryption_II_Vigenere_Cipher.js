/*
Encryption II: Vigenère Cipher
You are attempting to solve a Coding Contract. You have 10 tries remaining, after which the contract will self-destruct.


Vigenère cipher is a type of polyalphabetic substitution. It uses the Vigenère square to encrypt and decrypt plaintext with a keyword.

  Vigenère square:
         A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
       +----------------------------------------------------
     A | A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
     B | B C D E F G H I J K L M N O P Q R S T U V W X Y Z A
     C | C D E F G H I J K L M N O P Q R S T U V W X Y Z A B
     D | D E F G H I J K L M N O P Q R S T U V W X Y Z A B C
     E | E F G H I J K L M N O P Q R S T U V W X Y Z A B C D
                ...
     Y | Y Z A B C D E F G H I J K L M N O P Q R S T U V W X
     Z | Z A B C D E F G H I J K L M N O P Q R S T U V W X Y

For encryption each letter of the plaintext is paired with the corresponding letter of a repeating keyword. For example, the plaintext DASHBOARD is encrypted with the keyword LINUX:
   Plaintext: DASHBOARD
   Keyword:   LINUXLINU
So, the first letter D is paired with the first letter of the key L. Therefore, row D and column L of the Vigenère square are used to get the first cipher letter O. This must be repeated for the whole ciphertext.

You are given an array with two elements:
  ["MEDIAARRAYSHIFTLOGICPOPUP", "BOOKMARK"]
The first element is the plaintext, the second element is the keyword.

Return the ciphertext as uppercase string.


If your solution is an empty string, you must leave the text box empty. Do not use "", '', or ``.

*/

export async function main(ns) {
    const [input, contractFileName, serverCoding] = ns.args;

    // Parse the input array
    const [plaintext, keyword] = JSON.parse(input);
    ns.print(`Plaintext: ${plaintext}, Keyword: ${keyword}`);

    // Encrypt using Vigenère cipher
    const ciphertext = vigenereEncrypt(plaintext, keyword);
    ns.print(`Ciphertext: ${ciphertext}`);

    // Attempt to solve the contract
    const reward = ns.codingcontract.attempt(ciphertext, contractFileName, serverCoding);
    if (reward) {
        ns.tprint(`\u001b[32mSolved ${contractFileName} on ${serverCoding}: ${reward}\u001b[0m`);
    } else {
        ns.tprint(`\u001b[31mFailed to solve ${contractFileName} on ${serverCoding}\u001b[0m`);
    }
}

function vigenereEncrypt(plaintext, keyword) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let ciphertext = "";
    keyword = keyword.toUpperCase();

    for (let i = 0, j = 0; i < plaintext.length; i++) {
        const char = plaintext[i].toUpperCase();
        if (alphabet.includes(char)) {
            const p = alphabet.indexOf(char);
            const k = alphabet.indexOf(keyword[j % keyword.length]);
            ciphertext += alphabet[(p + k) % 26];
            j++;
        } else {
            ciphertext += char;
        }
    }

    return ciphertext;
}
