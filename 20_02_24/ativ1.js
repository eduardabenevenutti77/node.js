// 1) Crie um programa que calcule a média ((nota1 + nota2 + nota3 / 3))

const readLine = require('readline');

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

let mediaNotas = [];

function inserindoNotas(i) {
    rl.question(`Informe a ${i+1}ª nota: `, (nota) => {
        mediaNotas.push(Number(nota));
        if (mediaNotas.length<3) {
            inserindoNotas(mediaNotas.length)
        } else {
            calculoMedia();
            rl.close();
        }
    });
}

function calculoMedia() {
    let calculoMedia = (mediaNotas[0] + mediaNotas[1] + mediaNotas[2]/3);
    console.log('Média de notas do aluno foi de : ' +  calculoMedia);
}

inserindoNotas(0);