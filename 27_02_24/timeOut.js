const { rejects } = require("assert");
const { resolve } = require("path");

// new Promise((resolve, rejects) => {
//     new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log(10+5) // espera 3 segundos para executar essa promisse - CALLBACK
//         }, 3000)
//         //rejects('Error')
//         console.log(25+7)
//     })
// })

// new Promise((resolve, rejects) => {
//     new Promise((resolve, reject) => {
//         setTimeout(() => {
//            try {
//             resolve(2+2)
//            } catch (e) {
//             reject(e)
//            }
//         }, 3000)
//     })
// })