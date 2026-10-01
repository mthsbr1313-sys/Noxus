/* ================================================================
   NOXUS SISTEMAS — js/script.js
   Aula 08: JavaScript toma decisões (DOM, eventos, if/else)

   Encontra os elementos da seção "Consulte um serviço" (servicos.html)
   e responde com uma orientação diferente para cada serviço do Noxus
   ERP, conforme a opção escolhida no <select>.
   ================================================================ */

// 1) Encontra os elementos no DOM pelos mesmos ids usados no HTML
const campoServico = document.querySelector("#servico");
const botaoConsultar = document.querySelector("#btnConsultar");
const resultado = document.querySelector("#resultado");

/*
  Em outras páginas do site (index.html, contato.html, suporte.html)
  esses elementos não existem, então document.querySelector retorna
  null. Essa checagem evita um erro no Console nas páginas em que a
  seção de consulta não está presente.
*/
if (campoServico && botaoConsultar && resultado) {

  // 2) Escuta o clique no botão e lê o valor escolhido no select
  botaoConsultar.addEventListener("click", () => {
    const escolha = campoServico.value;

    // 3) Toma uma decisão diferente para cada serviço do Portal
    if (escolha === "") {
      resultado.textContent = "Escolha um serviço antes de consultar.";
    } else if (escolha === "fiscal") {
      resultado.textContent = "O módulo Fiscal emite NF-e, NFC-e e NFS-e direto do sistema, já com as regras fiscais atualizadas.";
    } else if (escolha === "estoque") {
      resultado.textContent = "O módulo Estoque controla entradas, saídas e inventário em tempo real, evitando ruptura ou excesso de produtos.";
    } else if (escolha === "financeiro") {
      resultado.textContent = "O módulo Financeiro organiza contas a pagar, a receber e o fluxo de caixa da sua empresa em um só painel.";
    } else if (escolha === "vendas") {
      resultado.textContent = "O módulo Vendas & PDV integra a frente de caixa, orçamentos e pedidos de venda ao restante do ERP.";
    } else {
      resultado.textContent = "Serviço não identificado.";
    }
  });
}
