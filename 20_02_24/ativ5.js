// 5) Crie um programa que calcule bhaskara

const readLine = require('readline')

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

let ladoA = [];
let ladoB = [];
let ladoC = [];

function inserindoValoresLados(i) {
    rl.question(`Informe o valor do lado A: `, (a) => {
        ladoA.push(Number(a));
        if(ladoA.length<1){
            inserindoValoresLados(ladoA.length)
        } else {
            rl.question(`Informe o valor do lado B: `, (b) => {
                ladoB.push(Number(b));
                if(ladoB.length<1){
                    inserindoValoresLados(ladoB.length);
                } else {
                    rl.question(`Informe o valor do lado C: `, (c) => {
                        ladoC.push(Number(c));
                        if(ladoC.length<1){
                            inserindoValoresLados(ladoC.length);
                        } else {
                            calculoBhaskara();
                            rl.close();
                        }
                    })
                }
            })
        }
    })
}
//  (-b±√(b²-4ac))/(2a)
function calculoBhaskara() {
    let calculo1 = (ladoB * 2 - 4 * ladoA * ladoC);
    let calculo2 = ()
}

inserindoValoresLados(0);