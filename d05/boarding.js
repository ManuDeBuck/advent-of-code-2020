const fs = require("fs");

function computeRowCol(bp) {
    const row = bp.substr(0, 7)
        .replace(/B/g, "1")
        .replace(/F/g, "0");
    const col = bp.substr(7, 3)
        .replace(/R/g, "1")
        .replace(/L/g, "0");
    return {row: row, col: col};
}

function computeSeatId(bp) {
    const {row, col} = computeRowCol(bp);
    return parseInt(row, 2) * 8 + parseInt(col, 2);
}

async function solve(filename, fnc) {
    const input = await fs.readFileSync(filename).toString();
    const lines = input.split("\n");
    return lines.map(bp => {
        if (bp.length > 0) return fnc(bp)
        else return 0
    }).reduce((a, b) => {
        if (a > b) return a
        else return b
    }, 0);
}

async function solve1(filename, fnc) {
    const input = await fs.readFileSync(filename).toString();
    const lines = input.split("\n");
    const ids = lines.map(bp => {
        if (bp.length > 0) return fnc(bp)
        else return 0
    });
    let missing = [];
    for (let i = 0; i < 128 * 8; i += 1) {
        if (ids.indexOf(i) < 0) {
            missing.push(i);
        }
    }
    missing = missing.sort((a, b) => {
        if (a < b) return a;
        else return b;
    });
    for (let i = 1; i < missing.length; i += 1) {
        if (missing[i - 1] + 1 !== missing[i]) return missing[i];
    }
    return -1;
}


solve("input", computeSeatId).then(result => console.log(result));
solve1("input", computeSeatId).then(result => console.log(result));
