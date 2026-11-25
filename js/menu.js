const botao = document.getElementById("btn-menu");
const menu = document.getElementById("menu");

botao.addEventListener("click", function () {
    const aberto = menu.classList.toggle("aberto");
    botao.setAttribute("aria-expanded", aberto);
});