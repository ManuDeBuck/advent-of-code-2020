const fs = require("fs");

function validateField(key, value) {
    switch (key) {
        case "byr":
            return value.length === 4 && 1920 <= parseInt(value) && parseInt(value) <= 2002;
        case "iyr":
            return value.length === 4 && 2010 <= parseInt(value) && parseInt(value) <= 2020;
        case "eyr":
            return value.length === 4 && 2020 <= parseInt(value) && parseInt(value) <= 2030;
        case "hgt":
            const length = parseInt(value.substr(0, value.length - 2));
            if (/^.*cm$/.test(value)) {
                return length >= 150 && length <= 193;
            } else if (/^.*in$/.test(value)) {
                return length >= 59 && length <= 76;
            }
            return false;
        case "hcl":
            return /^#[a-fA-F0-9]{6}$/.test(value);
        case "ecl":
            return /^(amb|blu|brn|gry|grn|hzl|oth)$/.test(value);
        case "pid":
            return /^[0-9]{9}$/.test(value);
    }
}

function validatePassport(passport, needed, validate = false) {
    const separators = [' ', '\n'];
    const kv = passport.split(new RegExp(separators.join('|'), 'g'));
    const found = [];

    for (const pair of kv) {
        if (pair.length < 1) continue;
        const split = pair.split(":");
        const key = split[0];
        const val = split[1];
        if (validate && !validateField(key, val)) {
            continue;
        }
        if (needed.indexOf(key) >= 0 && found.indexOf(key) < 0) {
            found.push(key);
        }
    }

    return found.length >= needed.length;
}

function validatePassportVal(passport, needed) {
    return validatePassport(passport, needed, true);
}

async function solve(filename, fnc) {
    const input = await fs.readFileSync(filename).toString();
    const lines = input.split("\n\n");
    const needed = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
    return lines.map(passport => {
        if (fnc(passport, needed)) {
            return 1;
        }
        return 0;
    }).reduce((a, b) => a + b, 0);
}



solve("input", validatePassport).then(result => console.log(result));
solve("input", validatePassportVal).then(result => console.log(result));
