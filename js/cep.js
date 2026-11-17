/* ================================================================
   NOXUS SISTEMAS — js/cep.js
   Atividade final: consulta de endereço por CEP na API pública ViaCEP
   (fetch + async/await + tratamento de erros)
   ================================================================ */

// 1) Encontra os elementos da seção "Consulta de endereço por CEP"
const campoCep = document.querySelector("#cep");
const botaoBuscarCep = document.querySelector("#btnBuscarCep");
const statusCep = document.querySelector("#statusCep");
const resultadoCep = document.querySelector("#resultadoCep");

async function buscarCep() {
  // 2) Remove tudo que não for número e valida o formato antes de usar a Internet
  const cep = campoCep.value.replace(/\D/g, "");

  if (cep.length !== 8) {
    statusCep.textContent = "Digite um CEP com 8 números.";
    resultadoCep.textContent = "";
    campoCep.focus();
    return;
  }

  // 3) Mensagem de carregamento enquanto a resposta não chega
  statusCep.textContent = "Consultando CEP...";
  resultadoCep.textContent = "";

  try {
    // 4) Requisição GET para a API; await espera a resposta chegar
    const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

    if (!resposta.ok) {
      throw new Error("Falha na consulta ao serviço.");
    }

    // 5) Converte o JSON recebido em um objeto JavaScript
    const dados = await resposta.json();

    // 6) CEP com formato válido, mas que não existe: a API devolve { erro: true }
    if (dados.erro) {
      statusCep.textContent = "CEP não encontrado.";
      return;
    }

    // 7) Mostra o endereço no DOM
    statusCep.textContent = "CEP encontrado.";
    resultadoCep.textContent =
      `${dados.logradouro || "Logradouro não informado"} - ` +
      `${dados.bairro || "Bairro não informado"} - ` +
      `${dados.localidade}/${dados.uf}`;

  } catch (erro) {
    // 8) Sem Internet, API fora do ar ou resposta com erro HTTP
    statusCep.textContent = "Não foi possível consultar o CEP agora.";
    console.error(erro);
  }
}

botaoBuscarCep.addEventListener("click", buscarCep);
