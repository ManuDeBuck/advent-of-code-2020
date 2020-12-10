const fs = require("fs");

function accValueBeforeLoop(lines) {
    let acc = 0;
    let index = 0;
    const visited = [];
    while (visited.indexOf(index) < 0 && index < lines.length) {
        visited.push(index);

        const line = lines[index];
        const op = line.substr(0, 3);
        const isPos = /\+/.test(line);
        const move = parseInt(line.match(/[0-9]+/)[0]);

        switch (op) {
            case "nop":
                index += 1;
                break;
            case "acc":
                if (isPos) acc += move;
                else acc -= move;
                index += 1;
                break;
            case "jmp":
                if (isPos) index += move;
                else index -= move;
        }
    }
    return {acc: acc, index: index};
}

function findCorruptedIns(lines) {
    for (let i = 0; i < lines.length; i += 1) {
        const line = lines[i];
        const op = line.substr(0, 3);
        if (op === "nop") {
            lines[i] = "jmp" + line.substr(3);
        } else if (op === "jmp") {
            lines[i] = "nop" + line.substr(3);
        } else {
            continue;
        }
        const {acc, index} = accValueBeforeLoop(lines);
        if (index === lines.length) return {acc: acc};
        lines[i] = line;
    }
}

async function solve(filename, fnc) {
    const input = await fs.readFileSync(filename).toString();
    const lines = input.split("\n");
    return fnc(lines);
}

solve("input", accValueBeforeLoop).then(result => console.log(result.acc));
solve("input", findCorruptedIns).then(result => console.log(result.acc));