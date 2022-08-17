'use strict';

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
 * Complete the 'minimumBribes' function below.
 *
 * The function accepts INTEGER_ARRAY q as parameter.
 */

function minimumBribes(q: number[]): void {
    // Write your code here
    const newQ = q.map((val) => val - 1);
     
    let minBribes = 0;
    let tooChaotic = false;
    
    for (let i = 0; i < newQ.length; i++) {
        if (newQ[i] - i > 2) {
            console.log("Too chaotic");
            return;
        }
    }                
  
    for (let i = newQ.length - 1 - 2; i >= 0; i--) {
        for (let j = i; j <= i + 2; j++) {
            if (newQ[j] > newQ[j+1]) {
                const temp = newQ[j];
                newQ[j] = newQ[j+1];
                newQ[j+1] = temp;
                minBribes++;
            }
        }
    }

    console.log(minBribes);
}

function main() {
    const t: number = parseInt(readLine().trim(), 10);

    for (let tItr: number = 0; tItr < t; tItr++) {
        const n: number = parseInt(readLine().trim(), 10);

        const q: number[] = readLine().replace(/\s+$/g, '').split(' ').map(qTemp => parseInt(qTemp, 10));

        minimumBribes(q);
    }
}
