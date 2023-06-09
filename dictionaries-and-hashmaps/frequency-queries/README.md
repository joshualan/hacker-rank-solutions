![image](https://github.com/joshualan/hacker-rank-solutions/assets/4478742/18184d3b-2075-4d95-bdd1-b327a8e46c4f)

This was fairly simple. We needed to track two things:

* The current number of occurences of each integer
* The frequency of each integer's occurrence

So it made sense to make two maps/dictionaries to handle each of those. 

**Solution**

```
function freqQuery(queries) {
    const frequencyMap = {};
    const occurenceMap = {};
    const resultsArray = [];
    
    for (let i = 0; i < queries.length; i++) {
        occurenceMap[i] = new Set();
    }
    
    for (const [operation, num] of queries) {
        const frequency = frequencyMap[num] || 0;
        // INSERT
        if (operation === 1) {
            frequencyMap[num] = frequency + 1;
            
            occurenceMap[frequency + 1].add(num);
            if (frequency > 0) {
                occurenceMap[frequency].delete(num);
            }
        }
        // DELETE
        else if (operation === 2) {
            frequencyMap[num] = Math.max(frequency - 1, 0);
            
            occurenceMap[frequency].delete(num);
            if (frequency > 0) {
                occurenceMap[frequency-1].add(num);
            } 
        }
        // FIND?
        else if (operation === 3) {
            resultsArray.push(occurenceMap[num] && occurenceMap[num].size ? 1 : 0);
        }
    }
    return resultsArray;
}
```
