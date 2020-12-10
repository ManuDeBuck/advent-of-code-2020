const fs = require("fs");

function countTrees(lines, below, right) {
    let col = 0;
    let count = 0;
    let wait = 0;
    lines.forEach(line => {
        if (wait === 0) {
            if (line.substr(col % line.length, 1) === "#") {
                count += 1;
            }
            col += right;
            wait = below;
        }
        wait -= 1;
    });
    return count;
}

async function solve1(filename, fnc) {
    const input = await fs.readFileSync(filename).toString();
    const lines = input.split("\n");
    return fnc(lines, 1, 3);
}

async function solve2(filename, fnc) {
    const input = await fs.readFileSync(filename).toString();
    const lines = input.split("\n");
    return fnc(lines, 1, 3) * fnc(lines, 1, 1) * fnc(lines, 1, 5) * fnc(lines, 1, 7) * fnc(lines, 2, 1);
}

solve1("input", countTrees).then(result => console.log(result));
solve2("input", countTrees).then(result => console.log(result));
