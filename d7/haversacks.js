const fs = require("fs");

function computeBagDict(lines) {
    const dict = {};
    const dict2 = {};
    const sups = [];
    for (const line of lines) {
        const sup = line.match(/^[a-z]+ [a-z]+/g)[0];
        const sub = line.match(/[0-9]+ [a-z]+ [a-z]+/g);
        dict[sup] = [];
        dict2[sup] = [];
        sups.push(sup);
        if (sub === null) {
            continue;
        }
        for (const s of sub) {
            // This code supposes numbers only containing one digit... I was too lazy to fix this
            dict[sup].push(s.substr(2));
            dict2[sup].push(parseInt(s.substr(0, 1)));
        }
    }
    return {hierarchDict: dict, countDict: dict2, sups: sups};
}

function countRecursive(dict, start, search) {
    for (const sub of dict[start]) {
        if (sub === search) {
            return true;
        } else {
            if(countRecursive(dict, sub, search)) return true;
        }
    }
    return false;
}

async function solve(filename, fnc) {
    const input = await fs.readFileSync(filename).toString();
    const lines = input.split("\n");
    const { hierarchDict, sups } = computeBagDict(lines);
    const search = "shiny gold"
    let count = 0;
    for (const sup of sups) {
        if(countRecursive(hierarchDict, sup, search)) count += 1;
    }
    return count;
}

function countRecursive2(hDict, cDict, search) {
    let count = 0;
    let index = 0;
    for (const sub of hDict[search]) {
        count += cDict[search][index];
        count += cDict[search][index] * countRecursive2(hDict, cDict, sub);
        index += 1;
    }
    return count;
}

async function solve2(filename, fnc) {
    const input = await fs.readFileSync(filename).toString();
    const lines = input.split("\n");
    const { hierarchDict, countDict } = computeBagDict(lines);
    const search = "shiny gold"
    return countRecursive2(hierarchDict, countDict, search);
}



solve("input", undefined).then(result => console.log(result));
solve2("input", undefined).then(result => console.log(result));