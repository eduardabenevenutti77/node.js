// 7) Crie um programa que calcule o percentual de imposto pago (faturamento \ qtd imposto)

const readLine = require('readline');

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

let faturamento = [], imposto = [];

function inserindoValoresImposto(i) {
    rl.question('Informe o valor de faturamento de uma empresa: ', (faturamentos) => {
        faturamento.push(Number(faturamentos));
        if (faturamento < 1) {
            inserindoValoresImposto(faturamento.length);
        } else {
            rl.question('Informe a quantidade de impostos a serem pagos: ', (impostos) => {
                imposto.push(Number(impostos));
                if (imposto < 1){
                    inserindoValoresImposto(imposto.length);
                } else {
                    calculoImposto();
                    rl.close();
                }
            })
        }
    })
}

function calculoImposto() {
    const calculoImposto = (faturamento[0] / imposto[0]);
    const porcentagem = (calculoImposto / 100);
    console.log('O percentual de impostos a serem pagos é de ' + porcentagem + "%");
}

inserindoValoresImposto(0);