'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}


// Complete the substrCount function below.
function substrCount(n, s) {
    let numSpecialStrings = 0;
    let sameCharSeries = 0;
    
    for (let i = 0; i < s.length; i++) {
        const c = s[i];
        // case of same char over e.g. 'ooooo'
        // if there's a series, we increment count by the
        // number of chars in the series
        // e.g. 
        // a = 1     -> { a }
        // aa = 3    -> { a, a, aa }
        // aaa = 6   -> { a, a, a, aa, aa, aaa }
        if (i > 0 && c === s[i-1]) {
            sameCharSeries++;
            numSpecialStrings += sameCharSeries;
        }
        // check if we're the middle character in a special string
        else if (i > 0) {
            // no longer in a series of the same char so reset
            sameCharSeries = 0;
            
            let left = i-1; 
            let right = i+1;

            const initialCharacter = s[left];
         
            while (left >= 0 && right < s.length &&
                s[right] === initialCharacter && s[left] === initialCharacter) {
                numSpecialStrings++;
                left--;
                right++;
            }
        }
        // every individual character here is a "special string"
        numSpecialStrings++;
    }
    
    return numSpecialStrings;

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const s = readLine();

    const result = substrCount(n, s);

    ws.write(result + '\n');

    ws.end();
}
