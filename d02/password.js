const fs = require("fs");

function compliesv1(policy) {
    const parts = policy.split(" ");
    const regexp = new RegExp(parts[1].substr(0, 1), 'g');
    const count = (regexp[Symbol.match](parts[2]) || []).length;
    const bound = parts[0].split("-").map(el => parseInt(el));
    return count >= bound[0] && count <= bound[1];
}

function compliesv2(policy) {
    const parts = policy.split(" ");
    const ind = parts[0].split("-").map(el => parseInt(el));
    const char = parts[1].substr(0, 1);
    return parts[2].substr(ind[0], 1) === char
        || parts[2].substr(ind[1], 1) === char;
}

async function solve(filename, fnc) {
    const input = await fs.readFileSync(filename).toString();
    const lines = input.split("\n");
    return lines.filter(el => el.length > 0 && fnc(el)).length;
}

solve("input", compliesv1).then(result => console.log(result));
solve("input", compliesv2).then(result => console.log(result));
