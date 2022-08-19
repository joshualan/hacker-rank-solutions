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
 * Complete the 'makeAnagram' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. STRING a
 *  2. STRING b
 */

function makeAnagram(a: string, b: string): number {
    let numDeletions = 0;
    
    const numberOfChars: Record<string, number> = {};
    const counts = {};
    
    for (const c of a) {
        numberOfChars[c] = (numberOfChars[c] || 0) + 1; 
    }
    
    for (const c of b) {
        numberOfChars[c] = (numberOfChars[c] || 0) - 1; 
    }
    
    for (let key in numberOfChars) {
        numDeletions += Math.abs(numberOfChars[key]);
    }
    
    return numDeletions;
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const a: string = readLine();

    const b: string = readLine();

    const res: number = makeAnagram(a, b);

    ws.write(res + '\n');

    ws.end();
}
