// Crie um programa que teste se um número é primo

const readLine = require('readline');

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

let numero = [];

function inserindoValores(i) {
    rl.question('Informe o valor: ', (nm) => {
        numero.push(Number(nm));
        if (numero < 1){
            inserindoValores(numero.length);
        } else {
            verificaNumero();
            rl.close();
        }
    })
}

function verificaNumero() {
    if (numero[0] / numero[0] == 1 ) {
        
    }
}

inserindoValores(0);