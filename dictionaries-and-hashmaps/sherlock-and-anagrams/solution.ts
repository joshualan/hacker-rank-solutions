'use strict';

import { WriteStream, createWriteStream } from "fs";
process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString: string = '';
let inputLines: string[] = [];
let currentLine: number = 0;

process.stdin.on('data', function(inputStdin: string): void {
    inputString += inputStdin;
});

process.stdin.on('end', function(): void {
    inputLines = inputString.split('\n');
    inputString = '';

    main();
});

function readLine(): string {
    return inputLines[currentLine++];
}

/*
 * Complete the 'sherlockAndAnagrams' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING s as parameter.
 */

function sherlockAndAnagrams(s: string): number {
    // Write your code here
    const dictionary: Record<string, number> = {};
    
    let  numAnagrams = 0;
    for (let i = 0; i < s.length; i++) {
        for (let j = 1; i + j <= s.length; j++ ) {
            const word = s.substring(i,i+j).split('').sort().join('');
            dictionary[word] = (dictionary[word] || 0) + 1;
        }
    }
    
    // This piece of logic is tricky. You have to remember that each entry matches with
    // everything else
    // so for n = number of anagram substrings 
    // n * (n - 1)
    // that's a permutation BUT we're counting the pairs so divide it by 2
    // (n * (n - 1)) / 2
    // and that's guaranteed to be divisible by two cuz y'know odd * even = even
    for (const word in dictionary) {
        const numEntries = dictionary[word];
        numAnagrams += (numEntries * (numEntries - 1)) / 2; 
    }
      
    return numAnagrams;
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const q: number = parseInt(readLine().trim(), 10);

    for (let qItr: number = 0; qItr < q; qItr++) {
        const s: string = readLine();

        const result: number = sherlockAndAnagrams(s);

        ws.write(result + '\n');
    }

    ws.end();
}
