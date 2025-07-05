/*
Compression III: LZ Compression
You are attempting to solve a Coding Contract. You have 10 tries remaining, after which the contract will self-destruct.


Lempel-Ziv (LZ) compression is a data compression technique which encodes data using references to earlier parts of the data. In this variant of LZ, data is encoded in two types of chunk. Each chunk begins with a length L, encoded as a single ASCII digit from 1 to 9, followed by the chunk data, which is either:

1. Exactly L characters, which are to be copied directly into the uncompressed data.
2. A reference to an earlier part of the uncompressed data. To do this, the length is followed by a second ASCII digit X: each of the L output characters is a copy of the character X places before it in the uncompressed data.

For both chunk types, a length of 0 instead means the chunk ends immediately, and the next character is the start of a new chunk. The two chunk types alternate, starting with type 1, and the final chunk may be of either type.

You are given the following input string:
    ici5HbbNqjQ6m5k65k65k65k6d5f1Yk6d5f1Yk8BL8fUo40NhoNhoNhoNhoh
Encode it using Lempel-Ziv encoding with the minimum possible output length.

Examples (some have other possible encodings of minimal length):
    abracadabra     ->  7abracad47
    mississippi     ->  4miss433ppi
    aAAaAAaAaAA     ->  3aAA53035
    2718281828      ->  627182844
    abcdefghijk     ->  9abcdefghi02jk
    aaaaaaaaaaaa    ->  3aaa91
    aaaaaaaaaaaaa   ->  1a91031
    aaaaaaaaaaaaaa  ->  1a91041


If your solution is an empty string, you must leave the text box empty. Do not use "", '', or ``.

*/

export async function main(ns) {
    const [input, contractFileName, serverCoding] = ns.args;

    ns.print(`Input: ${input}`);

    const compressed = lzCompress(input.slice(1, -1)); // slice to remove surrounding quotes
    ns.print(`Compressed Output: ${compressed}`);

    const reward = ns.codingcontract.attempt(compressed, contractFileName, serverCoding);
    if (reward) {
        ns.tprint(`\u001b[32mSolved ${contractFileName} on ${serverCoding}: ${reward}\u001b[0m`);
    } else {
        ns.tprint(`\u001b[31mFailed to solve ${contractFileName} on ${serverCoding}\u001b[0m`);
    }
}

function lzCompress(str) {
    let cur_state = Array.from(Array(10), _ => Array(10)), new_state, tmp_state, result;
    cur_state[0][1] = ''; // initial state: literal of length 1

    for (let i = 1; i < str.length; i++) {
        new_state = Array.from(Array(10), _ => Array(10));
        const c = str[i];

        // literals
        for (let len = 1; len <= 9; len++) {
            const input = cur_state[0][len];
            if (input === undefined) continue;

            if (len < 9) {
                set(new_state, 0, len + 1, input);
            } else {
                set(new_state, 0, 1, input + '9' + str.substring(i - 9, i) + '0');
            }

            for (let offset = 1; offset <= Math.min(9, i); offset++) {
                if (str[i - offset] === c) {
                    set(new_state, offset, 1, input + len + str.substring(i - len, i));
                }
            }
        }

        // references
        for (let offset = 1; offset <= 9; offset++) {
            for (let len = 1; len <= 9; len++) {
                const input = cur_state[offset][len];
                if (input === undefined) continue;

                if (str[i - offset] === c) {
                    if (len < 9) {
                        set(new_state, offset, len + 1, input);
                    } else {
                        set(new_state, offset, 1, input + '9' + offset + '0');
                    }
                }

                set(new_state, 0, 1, input + len + offset);

                for (let new_offset = 1; new_offset <= Math.min(9, i); new_offset++) {
                    if (str[i - new_offset] === c) {
                        set(new_state, new_offset, 1, input + len + offset + '0');
                    }
                }
            }
        }

        tmp_state = new_state;
        new_state = cur_state;
        cur_state = tmp_state;
    }

    for (let len = 1; len <= 9; len++) {
        let input = cur_state[0][len];
        if (input === undefined) continue;
        input += len + str.substring(str.length - len);
        if (result === undefined || input.length < result.length) result = input;
    }

    for (let offset = 1; offset <= 9; offset++) {
        for (let len = 1; len <= 9; len++) {
            let input = cur_state[offset][len];
            if (input === undefined) continue;
            input += len + '' + offset;
            if (result === undefined || input.length < result.length) result = input;
        }
    }

    return result ?? '';
}

function set(state, offset, len, val) {
    if (state[offset][len] === undefined || val.length < state[offset][len].length) {
        state[offset][len] = val;
    }
}

