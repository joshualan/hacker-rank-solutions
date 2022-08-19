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
 * Complete the 'isValid' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */

function isValid(s: string): string {
    // Write your code here
    const freqs: Record<string, number> = {};
    const values: number[] = [];
    let numDifferences = 0;
    
    let max = Number.NEGATIVE_INFINITY, mode;
    
    for (const c of s) {
        freqs[c] = (freqs[c] || 0) + 1;
    }

    for (const val in freqs) {
        values.push(freqs[val]);
    }
        
    for (let i = 0; i < values.length - 1; i++) {
        if (values[i] !== values[i+1]) {
            // try subtracting 1 from the next one if they're not equal?
            // we'll figure out if it won't work in the next loop
            values[i+1] -= 1;
            numDifferences++;
        }
        
        if (numDifferences > 1) {
            return "NO";
        }
    }
    
    return "YES";
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const s: string = readLine();

    const result: string = isValid(s);

    ws.write(result + '\n');

    ws.end();
}
