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
 * Complete the 'maximumToys' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY prices
 *  2. INTEGER k
 */

function maximumToys(prices: number[], k: number): number {
    // Write your code here
    let maxNumToys = 0;
    let total = 0;
    const sortedPrices = prices.sort((a, b) => a - b);
    
    for (const price of sortedPrices) {
        if (total + price <= k) {
            maxNumToys++;
            total+= price;
        }
    }
    
    return maxNumToys;

}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const firstMultipleInput: string[] = readLine().replace(/\s+$/g, '').split(' ');

    const n: number = parseInt(firstMultipleInput[0], 10);

    const k: number = parseInt(firstMultipleInput[1], 10);

    const prices: number[] = readLine().replace(/\s+$/g, '').split(' ').map(pricesTemp => parseInt(pricesTemp, 10));

    const result: number = maximumToys(prices, k);

    ws.write(result + '\n');

    ws.end();
}
