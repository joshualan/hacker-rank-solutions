'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the countTriplets function below.
// SAMPLE INPUT: 1 2 2 4
function countTriplets(arr, r) {
    let numTriplets = 0;
    
    const singles = {};
    const doubles = {};
    
    // I'm so clean oh my goodness, so simple
    for (const num of arr) {
        numTriplets += (doubles[num/r] || 0);
        doubles[num] = (doubles[num] || 0) + singles[num/r];
        singles[num] = (singles[num] || 0 ) + 1;
    }
    
    return numTriplets; 
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nr = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(nr[0], 10);

    const r = parseInt(nr[1], 10);

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const ans = countTriplets(arr, r);

    ws.write(ans + '\n');

    ws.end();
}
