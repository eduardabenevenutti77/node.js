const readLine = require('readline')

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

let ladoA, ladoB, ladoC;

function inserindoValoresLados() {
    rl.question(`Informe o valor do lado A: `, (a) => {
        ladoA = Number(a);
        rl.question(`Informe o valor do lado B: `, (b) => {
            ladoB = Number(b);
            rl.question(`Informe o valor do lado C: `, (c) => {
                ladoC = Number(c);
                calculoBhaskara();
            });
        });
    });
}

//  (-b±√(b²-4ac))/(2a)
function calculoBhaskara() {
    let calculo1 = Math.pow(ladoB, 2) - 4 * ladoA * ladoC;
    if (calculo1 >= 0) {
        const raizA = (-ladoB + Math.sqrt(calculo1)) / (2 * ladoA);
        const raizB = (-ladoB - Math.sqrt(calculo1)) / (2 * ladoA);
        console.log("Raiz A: " + raizA);
        console.log('Raiz B: ' + raizB);
    } else {
        console.log("Raízes não reais (complexas)");
    }
    rl.close();
}


inserindoValoresLados();