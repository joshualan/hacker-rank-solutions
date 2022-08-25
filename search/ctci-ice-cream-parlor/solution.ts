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
 * Complete the 'whatFlavors' function below.
 *
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY cost
 *  2. INTEGER money
 */

function whatFlavors(cost: number[], money: number): void {
    // Write your code here
    const prevCosts: Record<number, number> = {};
    
    for (let i = 0; i < cost.length; i++) {
        const difference = money - cost[i]; 
        if (prevCosts[difference] !== undefined) {
            console.log(prevCosts[difference] + 1, i + 1);
            return;
        }
        prevCosts[cost[i]] = i;
    }
    
    console.log(prevCosts);
}

function main() {
    const t: number = parseInt(readLine().trim(), 10);

    for (let tItr: number = 0; tItr < t; tItr++) {
        const money: number = parseInt(readLine().trim(), 10);

        const n: number = parseInt(readLine().trim(), 10);

        const cost: number[] = readLine().replace(/\s+$/g, '').split(' ').map(costTemp => parseInt(costTemp, 10));

        whatFlavors(cost, money);
    }
}
