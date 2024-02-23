// 4) Crie um programa que avalie se um valor é maior do que o dobro de outro valor

const readLine = require('readline');

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

let valor1 = [];
let valor2 = [];

function inserindoValores(i) {
    rl.question(`Informe o 1º valor: `, (value) => {
        valor1.push(Number(value));
        if(valor1.length<1) {
            inserindoValores(valor1.length)
        } else {
            rl.question(`Informe o 2º valor: `, (value_two => {
                valor2.push(Number(value_two));
                if(valor2.length<1){
                    inserindoValores(valor2.length)
                } else {
                    calculoComparacao();
                    rl.close();
                }
            }))
        }
    })
}

function calculoComparacao() {
    let dobroValor = (valor2[0] * 2);
    if (valor1>dobroValor) {
        console.log("O valor " + valor1[0] + " é maior que o dobro do valor " + valor2[0] + " = " + dobroValor)
    } else {
        console.log("Não foi dessa vez!")
    }
}

inserindoValores(0);