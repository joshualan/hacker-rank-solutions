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
 * Complete the 'luckBalance' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER k
 *  2. 2D_INTEGER_ARRAY contests
 */

function luckBalance(k: number, contests: number[][]): number {
    // Write your code here
    let maxLuckBalance = 0;
    let numContests = 0; 
    
    // sort the contests from greatest to leasat
    contests.sort((contestA, contestB) => {
        return contestB[0] - contestA[0];
    })
    
    
    // algorithm goes:
    // 1. if !important, we lose it and gain luck
    // 2. if important and we haven't failed out of k competitions yet,
    //    lose and gain the luck
    // 3. if important and we've failed k competitions, win and lose luck
    
    for (let i = 0; i < contests.length; i++) {
        const [luck, importance] = contests[i];
        
        if (numContests < k && importance) {
            maxLuckBalance += luck;
            numContests++;
        } 
        else if (importance) {
            maxLuckBalance -= luck;
        }
        
        else {
             maxLuckBalance = (maxLuckBalance || 0) + luck;
        }
    }
        
    return maxLuckBalance;
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const firstMultipleInput: string[] = readLine().replace(/\s+$/g, '').split(' ');

    const n: number = parseInt(firstMultipleInput[0], 10);

    const k: number = parseInt(firstMultipleInput[1], 10);

    let contests: number[][] = Array(n);

    for (let i: number = 0; i < n; i++) {
        contests[i] = readLine().replace(/\s+$/g, '').split(' ').map(contestsTemp => parseInt(contestsTemp, 10));
    }

    const result: number = luckBalance(k, contests);

    ws.write(result + '\n');

    ws.end();
}
