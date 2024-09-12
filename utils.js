// Função para validar as entradas
function validarEntrada(tipoAnimal, quantidade, animais) {
    if (!animais.some(animal => animal.especie === tipoAnimal)) {
      return 'Animal inválido';
    }
  
    if (typeof quantidade !== 'number' || quantidade <= 0) {
      return 'Quantidade inválida';
    }
  
    return null;
  }
  
  // Função para calcular o espaço restante no recinto
  function calcularEspacoRestante(recinto, animal, quantidade) {
    // Verificar bioma
    const biomasRecinto = recinto.bioma.split(' e ');
    const biomaAdequado = biomasRecinto.some(bioma => animal.bioma.includes(bioma));
    if (!biomaAdequado) {
      return -1;
    }
  
    // Verificar se o animal já presente no recinto é carnívoro
    const carnivoroPresente = recinto.animaisExistentes.some(a => {
      const especieExistente = buscarAnimal(a.especie);
      return especieExistente.carnivoro;
    });
  
    if (animal.carnivoro && recinto.animaisExistentes.length > 0) {
      return -1;
    }
  
    if (carnivoroPresente && !animal.carnivoro) {
      return -1;
    }
  
    // Verificar se os animais existentes continuam confortáveis
    let espacoOcupado = 0;
    recinto.animaisExistentes.forEach(a => {
      const especieExistente = buscarAnimal(a.especie);
      espacoOcupado += especieExistente.tamanho * a.quantidade;
    });
  
    // Considerar espaço adicional se houver mistura de espécies
    if (recinto.animaisExistentes.length > 0 && !animal.carnivoro) {
      espacoOcupado += 1; // Espécie adicional ocupa espaço extra
    }
  
    // Calcular espaço disponível
    const espacoDisponivel = recinto.tamanhoTotal - espacoOcupado;
  
    // Verificar se o novo animal cabe
    const espacoNecessario = animal.tamanho * quantidade;
    return espacoDisponivel >= espacoNecessario ? espacoDisponivel - espacoNecessario : -1;
  }
  
  module.exports = { validarEntrada, calcularEspacoRestante };
  