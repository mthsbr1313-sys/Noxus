# Noxus Sistemas

Site institucional do Noxus Sistemas, ERP para gestão comercial (emissão de notas,
controle de estoque, financeiro e vendas). Projeto desenvolvido na disciplina de
Programação Web.

## Páginas

- `index.html` — página inicial
- `servicos.html` — módulos do ERP, consulta interativa, catálogo dinâmico
  com filtro por categoria, preferência de serviço favorito (LocalStorage)
  e planos (Essencial, Profissional, Enterprise)
- `contato.html` — canais de atendimento, imagem de fundo em destaque e
  formulário de contato validado com JavaScript
- `suporte.html` — formulário de abertura de chamado para o chat de suporte

## Estrutura

```
noxus-sistemas/
├── index.html
├── servicos.html
├── contato.html
├── suporte.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── img/
    ├── logo-placeholder.svg
    ├── inicio.webp
    └── suporte1.jpg
```

## Imagens

- **Logotipo do menu** — ainda é o placeholder `img/logo-placeholder.svg`,
  usado no cabeçalho de todas as páginas. Substitua o arquivo (mantendo o
  nome) ou troque o `src` da tag `<img class="logo-placeholder">` em cada
  página quando tiver a logo final.
- **Imagem de destaque da página inicial** — `img/inicio.webp`, usada em
  `index.html` dentro de `<figure class="hero-image">`.
- **Imagem de fundo da página de contato** — `img/suporte1.jpg`, usada em
  `.contact-hero` no `css/style.css`. O arquivo original tinha 5760×3840px e
  13 MB; foi redimensionado para 2400×1600px (~210 KB) para a página carregar
  rápido, sem perda perceptível de qualidade no fundo da seção.

## Atividade de Flexbox

O menu (`.main-nav`) e os cards de serviço (`.container-servicos`, dentro de
`servicos.html`) foram organizados com Flexbox:

- `.container-servicos` usa `display: flex`, `flex-wrap: wrap` e `gap: 22px`
  para organizar os `article.module-card`.
- Cada `.module-card` usa `flex: 1 1 280px`, podendo crescer, encolher e
  quebrar linha conforme o espaço disponível.
- `.main-nav` usa `display: flex`, `gap` e foi testado com diferentes valores
  de `justify-content` (`flex-start`, `flex-end`, `center`, `space-between`,
  `space-around`) antes de definir o valor final.

**Resposta 1 — O que `display: flex` mudou no Portal?**
Os cards de serviço, que antes ficavam um abaixo do outro (bloco), passaram a
se organizar lado a lado automaticamente, porque o container pai
(`.container-servicos`) passou a controlar o eixo principal dos seus filhos
diretos em vez de cada `article` ocupar a largura total sozinho.

**Resposta 2 — Diferença entre `justify-content: center` e `space-between`?**
Com `center`, os itens ficam agrupados no meio do eixo principal, com o
espaço "sobrando" dividido igualmente nas duas pontas. Com `space-between`,
o primeiro item vai para o início, o último para o final, e o espaço
restante é distribuído apenas entre os itens do meio — sem sobrar espaço nas
bordas do container.

**Resposta 3 — Para que serviu `flex-wrap: wrap`?**
Sem ele, os cards tentariam caber todos em uma única linha, encolhendo até
ficarem espremidos em telas menores. Com `flex-wrap: wrap`, quando não há
espaço suficiente na linha, os cards que não cabem passam para a linha de
baixo, mantendo a leitura confortável em qualquer largura de janela.

## Atividade Aula 08 — JavaScript toma decisões (DOM, eventos, Git)

Em `servicos.html`, na seção "Consulte um serviço", um `<select>` com os
serviços reais do Noxus ERP (Fiscal, Estoque, Financeiro, Vendas & PDV) é lido
por `js/script.js` e respondido com uma mensagem diferente para cada opção.

- `document.querySelector("#id")` localiza, pelo id, o `<select>`, o `<button>`
  e o `<p id="resultado">` usados na interação.
- `.value` lê, no momento do clique, qual opção está selecionada no `<select>`.
- `addEventListener("click", ...)` escuta o clique no botão "Consultar
  orientação" e só então executa a lógica de decisão.
- `if / else if / else` compara a escolha (`===`) com cada serviço e decide
  qual mensagem exibir; o `else` final cobre qualquer valor inesperado.
- `textContent` atualiza o texto do `<p id="resultado">` diretamente no DOM,
  sem recarregar a página.

**O que `querySelector` faz?** Procura, no documento, o primeiro elemento que
combina com o seletor informado (aqui, um id) e devolve uma referência a ele,
para que o JavaScript possa ler ou alterar esse elemento depois.

**O que `.value` retorna?** O valor atual selecionado no campo — no caso do
`<select>`, o `value` da `<option>` marcada no momento em que o código é
executado.

**Para que serve o evento `click`?** Ele faz o bloco de código dentro do
`addEventListener` rodar somente quando o usuário realmente clica no botão,
em vez de rodar assim que a página carrega.

**O que `===` está comparando?** Se a escolha do usuário é exatamente igual
(mesmo valor e mesmo tipo) a um dos valores esperados (`"fiscal"`,
`"estoque"`, `"financeiro"`, `"vendas"`), sem converter tipos diferentes para
fazer a comparação "funcionar".

**Diferença entre `if`, `else if` e `else`?** `if` testa a primeira condição;
se for falsa, cada `else if` testa outra condição possível, em sequência; e o
`else` final roda apenas se nenhuma das condições anteriores foi verdadeira —
é a resposta "de qualquer outro caso".

**O que `textContent` altera no DOM?** O conteúdo de texto visível de um
elemento — aqui, a mensagem dentro do `<p id="resultado">` — sem precisar
recarregar a página ou reescrever o HTML inteiro.

**Qual alteração aparece no último commit?** A sugestão de mensagem de commit
para esta etapa é `"Adiciona consulta interativa de serviços com
JavaScript"`, descrevendo a seção nova em `servicos.html` e o arquivo
`js/script.js`.

## Atividade Aulas 09 e 10 — Arrays, objetos, funções e DOM

Em `servicos.html`, a seção "Catálogo de serviços" monta os cards
automaticamente a partir de uma lista de dados, em vez de HTML digitado à
mão. O array `servicos`, em `js/script.js`, guarda 5 serviços reais do Noxus
ERP (emissão de notas, controle de estoque, contas a pagar/a receber,
relatórios financeiros e frente de caixa), cada um como um objeto com
`nome`, `descricao` e `categoria`.

- `[ ]` cria o **array** `servicos`: uma lista de itens.
- `{ }` cria, para cada item da lista, um **objeto**: um serviço com suas
  próprias informações.
- `document.querySelector("#listaServicos")` encontra, no DOM, o `<div>`
  vazio onde os cards serão colocados.
- `function renderizarServicos(lista) { ... }` agrupa, com um nome, a tarefa
  de montar os cards na tela a partir de uma lista recebida por parâmetro.
- `lista.innerHTML = ""`, no início da função, limpa o container antes de
  montar os cards, evitando duplicação se a função rodar mais de uma vez.
- `lista.forEach((servico) => { ... })` repete o mesmo bloco de código uma
  vez para cada serviço da lista.
- `document.createElement("article")`, `createElement("h3")` e
  `createElement("p")` criam os elementos do card na memória; `textContent`
  preenche o texto de cada um; `card.append(...)` e
  `listaServicos.appendChild(card)` colocam tudo no lugar certo do DOM.

**Qual é a diferença entre array e objeto?** O array (`[ ]`) é a lista
inteira de serviços; o objeto (`{ }`) é cada serviço dentro da lista, com
suas próprias propriedades (`nome`, `descricao`, `categoria`).

**Por que o primeiro índice é 0?** Porque o JavaScript (como a maioria das
linguagens de programação) numera listas a partir de zero: `servicos[0]` é
o primeiro serviço do array, `servicos[1]` é o segundo, e assim por diante.

**O que `forEach` faz?** Executa o mesmo bloco de código uma vez para cada
item de um array, sem precisar repetir o código manualmente para cada um.

**Para que serve uma função?** Agrupa um conjunto de instruções sob um
nome, para que essa tarefa possa ser executada (chamada) sempre que
necessário, sem reescrever o código toda vez.

**O que `document.createElement` faz?** Cria um elemento HTML novo "na
memória" (ainda fora da página), que só aparece na tela depois de ser
inserido no DOM com `append` ou `appendChild`.

**O que `textContent` altera?** O texto visível de um elemento — aqui, o
nome e a descrição de cada serviço dentro do `<h3>` e do `<p>` do card.

**Para que servem `append` e `appendChild`?** Os dois inserem elementos
dentro de outro elemento do DOM: `card.append(titulo, descricao)` coloca o
título e a descrição dentro do card, e `listaServicos.appendChild(card)`
coloca o card dentro do container da página.

## Atividade Aula 11 — Filtro interativo de serviços

Ainda na seção "Catálogo de serviços", um `<select id="filtroCategoria">`
permite escolher uma categoria (Fiscal, Estoque, Financeiro ou Vendas) e o
Portal mostra somente os serviços correspondentes, sem recarregar a página.

- Cada objeto do array `servicos` ganhou a propriedade `categoria`.
- `filtroCategoria.addEventListener("change", ...)` escuta a troca de opção
  no `<select>`, e `filtroCategoria.value` lê a categoria escolhida.
- `servicos.filter((servico) => servico.categoria === categoriaEscolhida)`
  cria uma lista **nova**, somente com os serviços da categoria escolhida,
  sem alterar o array `servicos` original.
- A lista filtrada é enviada para `renderizarServicos(servicosFiltrados)`,
  que já sabia montar cards a partir de qualquer lista recebida.
- `mensagemFiltro.textContent` mostra quantos serviços foram encontrados
  (ou a mensagem "Mostrando todos os serviços.").
- Dentro de `renderizarServicos`, `if (lista.length === 0) { ... return; }`
  trata o caso de uma categoria sem nenhum serviço, exibindo um aviso e
  encerrando a função antes do `forEach`.

**Qual é a diferença entre `forEach` e `filter`?** `forEach` percorre um
array e executa uma ação para cada item, sem criar uma lista nova. `filter`
também percorre o array, mas cria uma lista **nova**, mantendo apenas os
itens que passam em um teste (aqui, ter a categoria escolhida).

**O que o evento `change` observa?** O momento em que o usuário troca a
opção selecionada em um campo como o `<select>` — diferente do `click`, que
observa um clique em um botão.

**O que a propriedade `value` devolve?** O valor da opção atualmente
selecionada no `<select>` — no filtro, a categoria escolhida pelo usuário.

**Por que `renderizarServicos` recebe uma lista?** Porque, a partir da
Aula 11, a função pode precisar montar tanto a lista completa de serviços
quanto uma lista filtrada por categoria; recebendo a lista como parâmetro,
o mesmo código serve para os dois casos.

**O `filter` modifica o array original?** Não. `filter` sempre devolve um
array novo; o array `servicos` original permanece intacto, com todos os
serviços e todas as categorias.

**Para que servem `length` e `return` no tratamento da lista vazia?**
`lista.length` informa quantos itens a lista tem; quando é `0`, o `return`
encerra a função imediatamente, antes de tentar rodar o `forEach` em uma
lista sem itens.

**Qual alteração aparece no último commit?** A sugestão de mensagem de
commit para esta etapa é `"Adiciona filtro de categorias ao catálogo"`,
descrevendo a nova seção de filtro em `servicos.html` e a lógica de
`filter` em `js/script.js`.

## Atividade Aula 12 — Validação de formulário com JavaScript

Em `contato.html`, a seção "Prefere que a gente te chame?" tem um
formulário (`#formContato`) com nome, e-mail e serviço de interesse. Ele
mantém a validação nativa do HTML (`required` nos três campos e
`type="email"`) e soma uma validação em JavaScript, em `js/script.js`.

- `formulario.addEventListener("submit", (evento) => { ... })` escuta o
  envio do formulário.
- `evento.preventDefault()` impede o recarregamento da página, para que o
  próprio JavaScript trate o envio e mostre a resposta no DOM.
- `.value.trim()` lê o texto digitado em cada campo e remove espaços em
  branco do início e do fim, evitando que um campo "preenchido só com
  espaço" passe como válido.
- `if (nome === "" || email === "" || servico === "") { ... return; }`
  verifica se algum campo obrigatório ficou vazio; se sim, mostra uma
  orientação e interrompe a função antes de confirmar o envio.
- `mensagemForm.textContent` exibe a confirmação, com o nome da pessoa
  inserido por template string (`` `Obrigado, ${nome}!` ``).

**Qual a diferença entre `click` e `submit`?** `click` observa o clique em
qualquer elemento (como um botão avulso); `submit` é o evento específico
de envio de um `<form>`, disparado tanto pelo clique no botão de envio
quanto por pressionar Enter dentro do formulário.

**Para que serve `preventDefault()`?** Impede o comportamento padrão do
navegador para aquele evento — no caso do `submit`, evita que a página
recarregue ou seja enviada para outro endereço, permitindo que o
JavaScript trate o envio e mostre uma resposta sem sair da página.

**O que `.value` e `.trim()` fazem?** `.value` lê o conteúdo atual de um
campo de formulário; `.trim()` é um método de texto que remove espaços em
branco do começo e do fim desse valor, sem alterar o que está no meio.

**O que significa `||`?** É o operador lógico "OU": a condição inteira é
verdadeira se **pelo menos uma** das partes separadas por `||` for
verdadeira — aqui, se nome OU e-mail OU serviço estiver vazio.

**Por que usamos `return`?** Para interromper a execução da função
naquele ponto, assim que detectamos um problema (campo vazio), sem deixar
o código continuar e mostrar a mensagem de confirmação por engano.

**Qual alteração aparece no commit desta etapa?** A sugestão de mensagem
de commit é `"Adiciona validação JavaScript ao formulário"`, descrevendo
o novo formulário em `contato.html` e sua validação em `js/script.js`.

## Atividade Aula 13 — LocalStorage (preferência salva no navegador)

Em `servicos.html`, a seção "Meu serviço favorito" permite escolher uma
categoria (Fiscal, Estoque, Financeiro ou Vendas) e salvá-la no navegador.
Ao atualizar a página, a preferência salva volta a aparecer sozinha.

- `localStorage.setItem("servicoFavorito", servico)` salva a escolha no
  navegador, associada à chave `"servicoFavorito"`.
- `localStorage.getItem("servicoFavorito")` recupera esse valor — inclusive
  depois de a página ser recarregada ou reaberta.
- Ao carregar a página, se já existir um valor salvo, o `<select>` é
  preenchido automaticamente (`campoFavorito.value = favoritoSalvo`) e a
  mensagem de boas-vindas é atualizada.
- Nenhum dado sensível é armazenado — apenas a categoria de serviço
  escolhida, sem nome, e-mail, telefone ou qualquer informação pessoal.

**Qual a diferença entre `setItem()` e `getItem()`?** `setItem(chave,
valor)` grava uma informação no armazenamento do navegador; `getItem(chave)`
lê de volta o valor salvo com aquela chave, podendo retornar `null` se
nada tiver sido salvo ainda.

**Onde o LocalStorage fica armazenado?** No próprio navegador do usuário,
associado ao endereço (origem) do site — não fica escrito dentro dos
arquivos HTML, CSS ou JavaScript do projeto, e pode ser inspecionado em
F12 → Application → Local Storage.

**Por que não devemos guardar dados sensíveis nessa atividade?** Porque o
LocalStorage não é criptografado e fica acessível a qualquer script que
rode na mesma página (e a quem tiver acesso ao navegador); por isso, só a
categoria de serviço preferida é salva — nunca senha, CPF, dados bancários
ou outras informações pessoais.

**Qual alteração aparece no commit desta etapa?** A sugestão de mensagem
de commit é `"Adiciona preferência de serviço com LocalStorage"`,
descrevendo a nova seção "Meu serviço favorito" em `servicos.html` e o uso
de `setItem`/`getItem` em `js/script.js`.

## Entrega das atividades

Preencher antes de enviar:

- Nome completo:
- Link do repositório GitHub:
- Link do GitHub Pages (se já publicado):
- Captura de tela da página de serviços com os cards organizados (Flexbox): (anexar)
- Captura de tela da consulta de serviço funcionando, com uma mensagem exibida (Aula 08): (anexar)
- Captura de tela do catálogo de serviços montado dinamicamente (Aulas 09 e 10): (anexar)
- Captura de tela do filtro por categoria funcionando, com duas categorias diferentes (Aula 11): (anexar)
- Captura de tela do formulário de contato validado, mostrando a mensagem de confirmação (Aula 12): (anexar)
- Captura de tela do serviço favorito salvo, e do DevTools (Application → Local Storage) mostrando a chave `servicoFavorito` (Aula 13): (anexar)

## Autor(a)

Matheus
