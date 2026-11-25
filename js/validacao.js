// Mostra o erro de um campo (ou apaga, se a mensagem for "")
function definirErro(campo, mensagem) {
    const paragrafoErro = document.getElementById("erro-" + campo.name);
    if (!paragrafoErro) return;            // botões e campos sem aviso são ignorados

    paragrafoErro.textContent = mensagem;

    // marca todos os campos com esse name (necessário nos grupos de rádio)
    document.querySelectorAll('[name="' + campo.name + '"]').forEach(function (item) {
        item.classList.toggle("invalido", mensagem !== "");
        item.setAttribute("aria-invalid", mensagem !== "");
    });
}

// Confere UM campo com as regras de modelagem de caracteres e HTML, mostrando a mensagem certa.
// Devolve true se estiver tudo certo.
function validarCampo(campo, msgVazio, msgInvalido) {
    let mensagem = "";

    // 1. Modelagem: Campo obrigatório e vazio
    if (campo.validity.valueMissing) {
        mensagem = msgVazio;
    } 
    // 2. Modelagem: Tamanho mínimo de caracteres (minlength)
    else if (campo.validity.tooShort) {
        const min = campo.getAttribute("minlength");
        mensagem = `O texto é muito curto. O mínimo exigido é de ${min} caracteres.`;
    } 
    // 3. Modelagem: Tamanho máximo de caracteres (maxlength)
    else if (campo.validity.tooLong) {
        const max = campo.getAttribute("maxlength");
        mensagem = `O texto ultrapassou o limite de ${max} caracteres.`;
    } 
    // 4. Modelagem: Padrão de caracteres incorreto (regex via atributo pattern)
    else if (campo.validity.patternMismatch) {
        mensagem = msgInvalido || "O formato dos caracteres preenchidos é inválido.";
    } 
    // 5. Outras falhas gerais de validade do HTML5
    else if (!campo.checkValidity()) {
        mensagem = msgInvalido;
    }

    definirErro(campo, mensagem);
    return mensagem === "";
}

function limparErro(campo) {
    definirErro(campo, "");
}

function limparTodosErros(formulario) {
    for (const campo of formulario.elements) {
        limparErro(campo);
    }
}

// Data de hoje no formato do <input type="date"> (aaaa-mm-dd).
// Usa a data LOCAL: toISOString() usa UTC e, à noite no Brasil, daria o dia seguinte.
function dataDeHoje() {
    const hoje = new Date();
    const mes = String(hoje.getMonth() + 1).padStart(2, "0");
    const dia = String(hoje.getDate()).padStart(2, "0");
    return hoje.getFullYear() + "-" + mes + "-" + dia;
}

// Liga a validação ao formulário
function ligarValidacao(formulario, validar) {
    // ao enviar: se algo estiver errado, bloqueia o envio e foca no primeiro erro
    formulario.addEventListener("submit", function (evento) {
        if (!validar()) {
            evento.preventDefault();
            const primeiroErro = formulario.querySelector('[aria-invalid="true"]');
            if (primeiroErro) {
                primeiroErro.focus();
            }
        }
    });

    // ao corrigir um campo, o aviso dele some dinamicamente
    formulario.addEventListener("input", function (evento) { limparErro(evento.target); });
    formulario.addEventListener("change", function (evento) { limparErro(evento.target); });

    // botão "Limpar": apaga também os avisos
    formulario.addEventListener("reset", function () {
        setTimeout(function () { limparTodosErros(formulario); }, 0);
    });
}

// Contador de caracteres ("0/200") de um campo de texto com suporte a modelagem visual
function ligarContador(textarea, contador) {
    function atualizar() {
        if (!textarea || !contador) return;
        const atual = textarea.value.length;
        const max = textarea.maxLength;
        contador.textContent = atual + (max > 0 ? "/" + max : "");
        
    }
    
    if (textarea && contador) {
        textarea.addEventListener("input", atualizar);
        textarea.form.addEventListener("reset", function () { setTimeout(atualizar, 0); });
        atualizar(); // Executa na carga inicial
    }
}