// 3) Crie um programa que calcule o volume (largura * altura * profundidade)

const readLine = require('readline');

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

let largura = [];
let altura = [];
let profundidade = [];

function inserindoVolume(i) {
    rl.question(`Informe a largura: `, (lg) => {
        largura.push(Number(lg));
        if(largura.length<1) {
            inserindoVolume(largura.length);
        } else {
            rl.question(`Informe a altura: `, (alt) => {
                altura.push(Number(alt));
                if(altura.length<1) {
                    inserindoVolume(altura.length);
                } else {
                    rl.question(`Informe a profundidade: `, (profund) => {
                        profundidade.push(Number(profund));
                        if(profundidade.length<1) {
                            inserindoVolume(profundidade.length)
                        } else {
                            calculoVolume();
                            rl.close;
                        }
                    })
                }
            })
        }
    });
}

function calculoVolume() {
    let volume = (largura[0] * altura[0] * profundidade[0]);
    console.log('A profundidade do objeto é: ' + volume);
}

inserindoVolume(0)