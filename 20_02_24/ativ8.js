// 8) Crie um programa que teste se um valor é par ou ímpar

const readLine = require('readline');

const rl = readLine.createInterface({
    input: process.stdin,
    output:  process.stdout
});

let valor = [];

function inserindoValor(i) {
    rl.question('Informe o valor: ', (nm) => {
        valor.push(Number(nm));
        if (valor < 1 ){
            inserindoValor(valor.length);
        } else {
            imparPar();
            rl.close;
        }
    })
}

function imparPar() {
    if (valor[0] % 2 == 0){
        console.log('O valor ' + valor[0] + ' é par!');
    } else {
        console.log('O valor ' + valor[0] + ' é impar!');
    }
}

inserindoValor(0);