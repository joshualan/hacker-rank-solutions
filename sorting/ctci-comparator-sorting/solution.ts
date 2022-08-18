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

function main() {
    // Enter your code here
    const numCases = parseInt(readLine());
    let entries = [];
    let value;
    while (value = readLine()) {
        const [name, score] = value.split(' ');
        entries.push([name, parseInt(score)]);
    }
    
    const sortedScores = entries.sort((a, b) => {
        const [nameA, scoreA] = a;
        const [nameB, scoreB] = b;
        if (scoreA === scoreB) {
            if (nameA < nameB) {
                return -1;
            }
            else if (nameA > nameB) {
                return 1;
            }
            return 0;
        }
        
        if (scoreA < scoreB) {
            return 1;
        }
        if (scoreA > scoreB) {
            return -1;
        }
        return 0;
    })
    
    
    sortedScores.forEach(([name, score]) => {
        console.log(name, score);
    })
    
}
