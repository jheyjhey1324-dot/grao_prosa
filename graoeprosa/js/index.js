/* Grão & Prosa - index.js (formulário de avaliação da página inicial) */

const formAvaliacao = document.getElementById("form-avaliacao");
const campos = formAvaliacao.elements;

// A visita já aconteceu: não aceita data futura
campos.data.max = dataDeHoje();

function validarAvaliacao() {
    const resultados = [
        validarCampo(campos.nome, "Informe seu nome.", "Use apenas letras e espaços (mínimo de 3 caracteres)."),
        validarCampo(campos.data, "Escolha a data da sua visita.", "A data não pode ser futura."),
        validarCampo(campos.comentario, "Escreva um comentário.", "Escreva de 10 a 200 caracteres."),
        validarCampo(campos.avaliacao[0], "Escolha de 1 a 5 estrelas.", "Escolha de 1 a 5 estrelas.")
    ];
    return !resultados.includes(false);
}

ligarValidacao(formAvaliacao, validarAvaliacao);
ligarContador(campos.comentario, document.getElementById("contador"));

/* Destaque dos cartões: o cartão avança quando o mouse passa por cima */
document.querySelectorAll(".destaques .cartao").forEach(function (cartao) {
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