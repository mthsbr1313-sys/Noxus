# Noxus Sistemas

Site institucional do Noxus Sistemas, ERP para gestão comercial (emissão de notas,
controle de estoque, financeiro e vendas). Projeto desenvolvido na disciplina de
Programação Web.

## Páginas

- `index.html` — página inicial
- `servicos.html` — módulos do ERP e planos (Essencial, Profissional, Enterprise)
- `contato.html` — canais de atendimento e imagem de fundo em destaque
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

## Entrega das atividades

Preencher antes de enviar:

- Nome completo:
- Link do repositório GitHub:
- Link do GitHub Pages (se já publicado):
- Captura de tela da página de serviços com os cards organizados (Flexbox): (anexar)
- Captura de tela da consulta de serviço funcionando, com uma mensagem exibida (Aula 08): (anexar)

## Autor(a)

Matheus
