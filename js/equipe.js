/* Grão & Prosa - equipe.js: confirma a nota dada a cada pessoa da equipe */
document.querySelectorAll(".estrelas-card").forEach(function (grupo) {
    grupo.addEventListener("change", function (evento) {
        const nome = grupo.closest(".card-membro").querySelector("h2").textContent;
        const aviso = grupo.parentElement.querySelector(".aviso-nota");
        aviso.textContent = "Você deu " + evento.target.value + " de 5 para " + nome + ". Obrigado!";
    });
});

/* Destaque dos cartões: o cartão avança quando o mouse passa por cima */
document.querySelectorAll(".card-membro").forEach(function (cartao) {
    function destacar() {
        cartao.classList.add("destacado");
    }

    function normalizar() {
        cartao.classList.remove("destacado");
    }

    cartao.addEventListener("mouseenter", destacar);
    cartao.addEventListener("mouseleave", normalizar);

    // quem navega pelo teclado também vê o destaque
    cartao.addEventListener("focusin", destacar);
    cartao.addEventListener("focusout", function (evento) {
        if (!cartao.contains(evento.relatedTarget)) {
            normalizar();
        }
    });
});