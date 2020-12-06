const fs = require("fs");

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

function computeAmountAnswers(answ) {
    const lines = answ.split("\n");
    const unique = [];
    lines.forEach((l) => {
        l.split("").forEach((a) => {
            if (unique.indexOf(a) < 0) unique.push(a);
        });
    });
    return unique.length;
}

function computeIntersectionAnswers(answ) {
    const lines = answ.split("\n");
    let intersection = lines.pop().split("");
    lines.forEach((l) => {
        intersection = l
            .split("")
            .filter(onlyUnique)
            .filter((a) => {
                return intersection.indexOf(a) >= 0;
            });
    });
    return intersection.length;
}

async function solve(filename, fnc) {
    const input = await fs.readFileSync(filename).toString();
    const lines = input.split("\n\n");
    return lines.map(answ => fnc(answ)).reduce((a, b) => a + b, 0);
}

solve("input", computeAmountAnswers).then(result => console.log(result));
solve("input", computeIntersectionAnswers).then(result => console.log(result));