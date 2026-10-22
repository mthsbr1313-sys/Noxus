/* ================================================================
   NOXUS SISTEMAS — js/script.js
   ================================================================ */

/* ----------------------------------------------------------------
   AULA 08 — JavaScript toma decisões (DOM, eventos, if/else)

   Encontra os elementos da seção "Consulte um serviço" (servicos.html)
   e responde com uma orientação diferente para cada serviço do Noxus
   ERP, conforme a opção escolhida no <select>.
   ---------------------------------------------------------------- */

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

/* ----------------------------------------------------------------
   AULAS 09 E 10 — Arrays, objetos, função e DOM
   (Catálogo de serviços: a lista de dados vira cards na tela)
   ---------------------------------------------------------------- */

// Lista de serviços do Noxus ERP. Cada objeto guarda nome, descrição
// e a categoria à qual o serviço pertence (usada no filtro da Aula 11).
const servicos = [
  {
    nome: "Emissão de notas fiscais",
    descricao: "Emita NF-e, NFC-e e NFS-e direto do sistema, com as regras fiscais sempre atualizadas.",
    categoria: "fiscal"
  },
  {
    nome: "Controle de estoque",
    descricao: "Acompanhe entradas, saídas, transferências entre filiais e inventário em tempo real.",
    categoria: "estoque"
  },
  {
    nome: "Contas a pagar e a receber",
    descricao: "Organize o fluxo de caixa e a conciliação bancária da empresa em um só painel.",
    categoria: "financeiro"
  },
  {
    nome: "Relatórios financeiros",
    descricao: "Acompanhe indicadores de faturamento, despesas e lucratividade do negócio.",
    categoria: "financeiro"
  },
  {
    nome: "Frente de caixa (PDV)",
    descricao: "Realize vendas, orçamentos e pedidos integrados ao restante do ERP.",
    categoria: "vendas"
  }
];

// Elementos do catálogo e do filtro (seção "Catálogo de serviços" em servicos.html)
const listaServicos = document.querySelector("#listaServicos");
const filtroCategoria = document.querySelector("#filtroCategoria");
const mensagemFiltro = document.querySelector("#mensagemFiltro");

/*
  Assim como a consulta da Aula 08, esses elementos só existem em
  servicos.html. A checagem evita erro no Console nas demais páginas.
*/
if (listaServicos && filtroCategoria && mensagemFiltro) {

  // Monta os cards na tela a partir de uma lista recebida por parâmetro.
  // Na Aula 10 essa lista era sempre "servicos"; na Aula 11 ela também
  // pode ser o resultado do filtro por categoria.
  function renderizarServicos(lista) {
    listaServicos.innerHTML = "";

    // Lista vazia (ex.: categoria sem nenhum serviço): avisa e encerra
    // a função antes de tentar montar qualquer card.
    if (lista.length === 0) {
      listaServicos.textContent = "Nenhum serviço foi encontrado nesta categoria.";
      return;
    }

    lista.forEach((servico) => {
      const card = document.createElement("article");
      card.classList.add("card-servico");

      const titulo = document.createElement("h3");
      titulo.textContent = servico.nome;

      const descricao = document.createElement("p");
      descricao.textContent = servico.descricao;

      card.append(titulo, descricao);
      listaServicos.appendChild(card);
    });
  }

  // Mostra o catálogo completo assim que a página carrega
  renderizarServicos(servicos);

  /* ----------------------------------------------------------------
     AULA 11 — Filtro interativo por categoria (change, value, filter)
     ---------------------------------------------------------------- */

  filtroCategoria.addEventListener("change", () => {
    const categoriaEscolhida = filtroCategoria.value;

    if (categoriaEscolhida === "todos") {
      renderizarServicos(servicos);
      mensagemFiltro.textContent = "Mostrando todos os serviços.";
    } else {
      // filter() cria uma lista NOVA, somente com os serviços cuja
      // categoria é igual à categoria escolhida. O array "servicos"
      // original não é alterado.
      const servicosFiltrados = servicos.filter((servico) => {
        return servico.categoria === categoriaEscolhida;
      });

      renderizarServicos(servicosFiltrados);
      mensagemFiltro.textContent = servicosFiltrados.length + " serviço(s) encontrado(s).";
    }
  });
}

/* ----------------------------------------------------------------
   AULA 12 — Validação de formulário com JavaScript
   (contato.html: formulário "Prefere que a gente te chame?")
   ---------------------------------------------------------------- */

const formulario = document.querySelector("#formContato");
const campoNome = document.querySelector("#nome");
const campoEmail = document.querySelector("#email");
const campoServicoContato = document.querySelector("#servicoContato");
const mensagemForm = document.querySelector("#mensagemForm");

/*
  Assim como as demais seções interativas, esses elementos só existem
  em contato.html. A checagem evita erro no Console nas outras páginas.
*/
if (formulario && campoNome && campoEmail && campoServicoContato && mensagemForm) {

  formulario.addEventListener("submit", (evento) => {
    // Impede o recarregamento da página: o próprio JavaScript vai
    // tratar o envio e mostrar a confirmação no DOM.
    evento.preventDefault();

    const nome = campoNome.value.trim();
    const email = campoEmail.value.trim();
    const servico = campoServicoContato.value;

    /*
      A validação nativa do HTML (required e type="email") já impede o
      envio com e-mail inválido ou campos vazios antes mesmo deste
      código rodar. Esta verificação em JavaScript é uma segunda
      camada: cobre espaços em branco (por causa do .trim()) e permite
      mostrar uma mensagem de orientação dentro da própria página.
    */
    if (nome === "" || email === "" || servico === "") {
      mensagemForm.textContent = "Preencha os campos obrigatórios antes de continuar.";
      return;
    }

    mensagemForm.textContent = `Obrigado, ${nome}! Sua solicitação foi registrada.`;
    formulario.reset();
  });
}

/* ----------------------------------------------------------------
   AULA 13 — LocalStorage: o navegador lembra uma preferência
   (servicos.html: seção "Meu serviço favorito")
   ---------------------------------------------------------------- */

const campoFavorito = document.querySelector("#servicoFavorito");
const botaoFavorito = document.querySelector("#btnSalvarFavorito");
const mensagemFavorito = document.querySelector("#favoritoSalvo");

if (campoFavorito && botaoFavorito && mensagemFavorito) {

  // Salva a escolha no navegador quando o botão é clicado
  botaoFavorito.addEventListener("click", () => {
    const servico = campoFavorito.value;

    if (servico === "") {
      mensagemFavorito.textContent = "Escolha um serviço primeiro.";
      return;
    }

    // Nenhum dado sensível é salvo aqui — apenas a categoria de
    // serviço que o usuário escolheu como favorita.
    localStorage.setItem("servicoFavorito", servico);
    mensagemFavorito.textContent = `Favorito salvo: ${servico}`;
  });

  // Recupera a preferência salva, se existir, assim que a página carrega
  const favoritoSalvo = localStorage.getItem("servicoFavorito");

  if (favoritoSalvo) {
    campoFavorito.value = favoritoSalvo;
    mensagemFavorito.textContent = `Seu serviço favorito é: ${favoritoSalvo}`;
  }
}
