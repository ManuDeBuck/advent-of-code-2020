const fs = require("fs");

function joltage(lines) {
    const sorted = lines.sort((a, b) => {
        return a - b;
    });
    let differences = {1: 0, 2: 0, 3: 1}
    sorted.reduce((a, b) => {
        differences[(b - a)] += 1;
        return b;
    }, 0);
    return differences;
}

// Thank you Gunnar <3
function possibilities(lines) {
    const sorted = lines.sort((a, b) => {
        return a - b;
    });
    const max = Math.max(...sorted);

    const counts = [];
    for(let i = 0; i < max; i += 1) counts.push(0);
    counts[max - 1] = 1;

    for (let index = sorted.length - 2; index >= 0; index -= 1) {
        for (let i = 1; i <= 3; i += 1) {
            if (sorted[index] + i > counts.length) continue;
            counts[sorted[index] - 1] += counts[sorted[index] + i - 1];
        }
    }
    return counts[0] + counts[1] + counts[2];
}

async function solve(filename, fnc) {
    const input = await fs.readFileSync(filename).toString();
    const lines = input.split("\n");
    return fnc(lines.map(line => parseInt(line)));
}

solve("input", joltage).then(result => console.log(result[1] * result[3]));
solve("input", possibilities).then(result => console.log(result));
