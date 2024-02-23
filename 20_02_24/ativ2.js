// 2) Crie um programa que calcule a área (lado1 * lado2)

const readLine = require ('readline');

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

let ladosArea = [];

function inserindoLados(i) {
    rl.question(`Informe o lado ${i+1}º: `, (area) => {
        ladosArea.push(Number(area));
        if(ladosArea.length<=2) {
            inserindoLados(ladosArea.length)
        } else {
            calculoArea();
            rl.close;
        }
    });
}

function calculoArea() {
    let calculo = (ladosArea[0] * ladosArea[1]);
    console.log('A área do objeto é: ' + calculo)
}

inserindoLados(0);