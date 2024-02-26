//  6) Crie um programa que calcule a velocidade média de uma viagem (distancia (km) / tempo (h))

const readLine = require('readline');

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

let distancia = [], tempo = [];

function inserindoValoresVelocidade(i) {
    rl.question('Informe a distância (km) que o carro percorreu: ', (km) => {
        distancia.push(Number(km));
        if (distancia < 1){
            inserindoValoresVelocidade(distancia.length);
        } else {
            rl.question('Informe o tempo (hr) que a viagem levou: ', (hr) => {
                tempo.push(Number(hr));
                if (tempo < 1){
                    inserindoValoresVelocidade(tempo.length)
                } else {
                    calculoVelocidade();
                    rl.close;
                }
            })
        }
    })
}

function calculoVelocidade() {
    const calculo = (distancia[0] /  tempo[0]);
    console.log('A velocidade média é de ' + calculo + 'km por hora!');
}

inserindoValoresVelocidade(0);