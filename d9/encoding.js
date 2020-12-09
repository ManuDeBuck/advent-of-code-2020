const fs = require("fs");

function doesSum(lastTf, sum) {
    for (let i = 0; i < lastTf.length; i += 1) {
        for (let j = 0; j < lastTf.length; j += 1) {
            if (i === j) continue;
            if (lastTf[i] + lastTf[j] === sum) return true;
        }
    }
    return false;
}

function findCorruptedIns(lines) {
    for (let i = 25; i < lines.length; i += 1) {
        const previous = lines.slice(i - 25, i);
        if (! doesSum(previous, lines[i])) {
            return lines[i];
        }
    }
}

function findWeakness(lines) {
    const invalid = findCorruptedIns(lines);
    for (let i = 0; i < lines.length; i += 1) {
        let sum = 0;
        let start = i;
        while (sum < invalid) {
            sum += lines[start];
            start += 1;
        }
        if (sum === invalid) {
            const subpart = lines.slice(i, start);
            return Math.max(...subpart) + Math.min(...subpart);
        }
    }
}

async function solve(filename, fnc) {
    const input = await fs.readFileSync(filename).toString();
    const lines = input.split("\n");
    return fnc(lines.map(line => parseInt(line)));
}

solve("input", findCorruptedIns).then(result => console.log(result));
solve("input", findWeakness).then(result => console.log(result));