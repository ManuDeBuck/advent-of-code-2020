const fs = require("fs");

function alterStateBis(old, update, adjacentPairs, i, j) {
    if (old[i][j] === ".") return false;

    const count = adjacentPairs.map(([a, b]) => {
        let startI = i + a;
        let startJ = j + b;
        while (!(startI < 0
            || startI >= old.length
            || startJ < 0
            || startJ >= old[0].length)) {
            if (old[startI][startJ] === "#") {
                return 1;
            } else if (old[startI][startJ] === "L") {
                return 0;
            }
            startI += a;
            startJ += b;
        }
        return 0;
    }).reduce((a, b) => a + b, 0);

    if (old[i][j] === "L" && count === 0) {
        update[i][j] = "#";
        return true;
    } else if (old[i][j] === "#" && count >= 5) {
        update[i][j] = "L";
        return true;
    }
    return false;
}

function alterState(old, update, adjacentPairs, i, j) {
    if (old[i][j] === ".") return false;

    const count = adjacentPairs.map(([a, b]) => {
        if (i + a < 0
            || i + a >= old.length
            || j + b < 0
            || j + b >= old[0].length) {
            return 0;
        }
        if (old[i + a][b + j] === "#") {
            return 1;
        }
        return 0;
    }).reduce((a, b) => a + b, 0);

    if (old[i][j] === "L" && count === 0) {
        update[i][j] = "#";
        return true;
    } else if (old[i][j] === "#" && count >= 4) {
        update[i][j] = "L";
        return true;
    }
    return false;
}

function deepCopy(original) {
    return original.map(function (arr) {
        return arr.slice();
    });
}

function conwaysWayOfChairs(chairs, fnc) {
    let changes = true;
    const copy = deepCopy(chairs);
    const pairs = [[1, 0], [0, 1], [-1, 0], [0, -1], [1, 1], [-1, 1], [1, -1], [-1, -1]];
    while (changes) {
        changes = false;
        for (let i = 0; i < chairs.length; i += 1) {
            for (let j = 0; j < chairs[0].length; j += 1) {
                if (fnc(chairs, copy, pairs, i, j)) changes = true;
            }
        }
        // This is rather lazy, better to use 3-dim array but was too lazy
        chairs = deepCopy(copy);
    }
    return chairs
        .map(line => (/#/g[Symbol.match](line) || []).length)
        .reduce((a, b) => a + b, 0);
}


async function solve(filename, fnc, fnc2) {
    const input = await fs.readFileSync(filename).toString();
    const lines = input.split("\n");
    return fnc(lines.map(line => line.split("")), fnc2);
}

solve("input", conwaysWayOfChairs, alterState).then(result => console.log(result));
solve("input", conwaysWayOfChairs, alterStateBis).then(result => console.log(result));
