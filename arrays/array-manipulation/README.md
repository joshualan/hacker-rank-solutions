![image](https://github.com/joshualan/hacker-rank-solutions/assets/4478742/331d3203-a99a-42f9-b9ba-c048ce92fc99)

I had a solution that basically brute-forced it with O(queries.length * n). That algorithm was basically 

* Create an array of size n
* Loop through the queries
  * For each query, loop through the array and increment the values where the indices were within a and b.

Though it works, it was inefficient and timed out on larger sets.

We can make it more efficient by reframing the problem.

If we imagine the array as a chronological record of a stock price where all we have are the fluctuations of the price, we can solve this problem a bit easier. Instead of making sure each index in the array represents its current status, we can just record the rate of change.

Basically, we loop through the fluctations and only note where the stock went up and where it went down. Then, we go through the array after all the fluctuations and find where it was the highest.

**SOLUTION**

```
/*
 * Complete the 'arrayManipulation' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. 2D_INTEGER_ARRAY queries
 */

function arrayManipulation(n: number, queries: number[][]): number {
    // Write your code here
    let largestNum = Number.NEGATIVE_INFINITY;
    const runningTotal = new Array(n).fill(0);
    
    // calculate the rate of change that each number in the array
    // experienced instead of brute forcing it
    for (let i = 0; i < queries.length; i++) {
        const [a, b, k] = queries[i];
        
        runningTotal[a-1] += k;
        runningTotal[b] -= k;
    }
    
    // go through the running totals and calculate which number
    // in the array had the HIGHEST total
    let currentTotal = 0;
    for (let i = 0; i < n; i++) {
        currentTotal += runningTotal[i];
        
        largestNum = Math.max(largestNum, currentTotal);
    }
    return largestNum;
}
```
