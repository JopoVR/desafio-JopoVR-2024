const { recintos } = require('./recintos');
const { animais, buscarAnimal } = require('./animais');
const { validarEntrada, calcularEspacoRestante } = require('./utils');

class RecintosZoo {
  analisaRecintos(tipoAnimal, quantidade) {
    // Validar entradas
    const erro = validarEntrada(tipoAnimal, quantidade, animais);
    if (erro) {
      return { erro };
    }

    const animal = buscarAnimal(tipoAnimal);
    const recintosViaveis = [];

    recintos.forEach((recinto) => {
      const espacoRestante = calcularEspacoRestante(recinto, animal, quantidade);
      if (espacoRestante >= 0) {
        recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoRestante} total: ${recinto.tamanhoTotal})`);
      }
    });

    if (recintosViaveis.length === 0) {
      return { erro: "Não há recinto viável" };
    }

    return { recintosViaveis: recintosViaveis.sort() };
  }
}

module.exports = RecintosZoo;
