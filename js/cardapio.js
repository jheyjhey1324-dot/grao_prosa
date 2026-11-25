/* Grão & Prosa - cardapio.js: paginação do cardápio */

const paginasCardapio = document.querySelectorAll(".pagina-cardapio");
const caixaCardapio = document.querySelector(".caixa-cardapio");
const botaoAnterior = document.getElementById("btn-anterior");
const botaoProximo = document.getElementById("btn-proximo");
const indicadorPagina = document.getElementById("indicador-pagina");

let paginaAtual = 0;      // 0 = primeira página

function mostrarPagina(numero) {
    paginaAtual = numero;

    // só a página atual recebe a classe "ativa" (o CSS esconde as outras)
    paginasCardapio.forEach(function (pagina, indice) {
        pagina.classList.toggle("ativa", indice === paginaAtual);
    });

    indicadorPagina.textContent = "Página " + (paginaAtual + 1) + " de " + paginasCardapio.length;

    botaoAnterior.disabled = (paginaAtual === 0);
    botaoProximo.disabled = (paginaAtual === paginasCardapio.length - 1);
}

botaoAnterior.addEventListener("click", function () {
    mostrarPagina(paginaAtual - 1);
    caixaCardapio.scrollIntoView();      // volta ao topo do cardápio
});

botaoProximo.addEventListener("click", function () {
    mostrarPagina(paginaAtual + 1);
    caixaCardapio.scrollIntoView();
});

mostrarPagina(0);