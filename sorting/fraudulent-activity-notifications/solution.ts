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
 * Complete the 'activityNotifications' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY expenditure
 *  2. INTEGER d
 */

function activityNotifications(expenditure: number[], d: number): number {
    // Write your code here
    const MAX_VALUE = 200;
    let numNotifications = 0;
    
    // the solution is a sliding window where we can calculate the median
    // we can have a sorted window of size d but even that takes too long
    // with some weird math and 40% of counting sort, we can make this work
    const window: number[] = [];
    const isOdd = !!(d%2);
    
    // what HackerRank uses to compile TS is weird and needs this
    for (let i = 0; i <= MAX_VALUE; i++) {
        window.push(0);
    }
    
    // skip over this for now
    const getMedianX2 = () => {
        let numDays = 0;
        
        // the easy case
        // each value existing in the array counts as a day
        // so if the number of days > d / 2 (e.g. d = 7, med = 3.5)
        // then the first one over that threshold is the median 
        if (isOdd) {
            for (let i = 0; i <= MAX_VALUE; i++) {
                numDays += (window[i] || 0);
                if (numDays >= d/2) {
                    return i * 2;
                }
            }
        }
        // stupid even numbers are dumb
        // in an even array of d = 4, median days are days 2 and  3 
        // which are... n/2 and n/2 + 1
        else {
            let medianLeft, medianRight;
            
            for (let i = 0; i <= MAX_VALUE; i++) {
                numDays += (window[i] || 0);
                if (!medianLeft && numDays >= d/2) {
                    medianLeft = i; 
                }
                if (!medianRight && numDays >= d/2 + 1) {
                    medianRight =  i; 
                }
                
                // IF WE MULTIPLY IT BY TWO ANYWAY, WE DON'T HAVE TO
                // DIVIDE IT BY TWO, save us some tiiime
                if (medianLeft && medianRight) {
                    return medianLeft + medianRight;
                }
            }
        }
    };
        
    for (let i = 0; i < d; i++) {
        const expense = expenditure[i];
        window[expense] += (window[expense] || 0) + 1
    }
    
    console.log(window);
    
    for (let i = d; i < expenditure.length; i++) {
        const medianX2 = getMedianX2();
        const expense = expenditure[i];
        
        if (expense >= medianX2) {
            numNotifications++;
        }
        
        // update the window to remove the oldest one 
        // and add the newest one
        window[expenditure[i-d]] -= 1;
        window[expense] = (window[expense] || 0) + 1;
    }
    
    return numNotifications;
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const firstMultipleInput: string[] = readLine().replace(/\s+$/g, '').split(' ');

    const n: number = parseInt(firstMultipleInput[0], 10);

    const d: number = parseInt(firstMultipleInput[1], 10);

    const expenditure: number[] = readLine().replace(/\s+$/g, '').split(' ').map(expenditureTemp => parseInt(expenditureTemp, 10));

    const result: number = activityNotifications(expenditure, d);

    ws.write(result + '\n');

    ws.end();
}
