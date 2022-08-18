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
 * Complete the 'countSwaps' function below.
 *
 * The function accepts INTEGER_ARRAY a as parameter.
 */

function countSwaps(a: number[]): void {
    // Write your code here
    let numSwaps = 0;
    
    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < a.length - i; j++) {
            if (a[j] > a[j+1]) {
                const temp = a[j];
                a[j] = a[j+1];
                a[j+1] = temp;
                numSwaps++;
            }
        }
    }

    console.log(`Array is sorted in ${numSwaps} swaps.`);
    console.log(`First Element: ${a[0]}`);
    console.log(`Last Element: ${a[a.length-1]}`);
}

function main() {
    const n: number = parseInt(readLine().trim(), 10);

    const a: number[] = readLine().replace(/\s+$/g, '').split(' ').map(aTemp => parseInt(aTemp, 10));

    countSwaps(a);
}
