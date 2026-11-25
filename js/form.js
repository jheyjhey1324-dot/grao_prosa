/* Grão & Prosa - form.js (somente a página de reservas) */

const formReserva = document.getElementById("form-reserva");
const campos = formReserva.elements;     // acesso pelo name: campos.nome, campos.email...

// 1. A reserva não pode ser para uma data que já passou
campos.data.min = dataDeHoje();

// 2. Lista de horários: das 08:00 às 20:00, de 30 em 30 minutos
for (let hora = 8; hora <= 20; hora++) {
    for (const minuto of ["00", "30"]) {
        if (hora === 20 && minuto === "30") break;      // o último horário é 20:00
        const texto = String(hora).padStart(2, "0") + ":" + minuto;
        campos.horario.add(new Option(texto, texto));
    }
}

// 3. Máscara do telefone: vai formatando como (41) 99999-9999
campos.telefone.addEventListener("input", function () {
    const numeros = campos.telefone.value.replace(/\D/g, "").slice(0, 11);   // só dígitos, até 11
    let texto = "";

    if (numeros.length > 7) {
        texto = "(" + numeros.slice(0, 2) + ") " + numeros.slice(2, 7) + "-" + numeros.slice(7);
    } else if (numeros.length > 2) {
        texto = "(" + numeros.slice(0, 2) + ") " + numeros.slice(2);
    } else if (numeros.length > 0) {
        texto = "(" + numeros;
    }
    campos.telefone.value = texto;
});

// 4. Validação de TODOS os campos (cada um com sua mensagem)
function validarReserva() {
    const resultados = [
        validarCampo(campos.nome, "Informe seu nome completo.", "Use apenas letras e espaços (mínimo de 3 caracteres)."),
        validarCampo(campos.email, "Informe seu e-mail.", "Digite um e-mail válido, como nome@email.com."),
        validarCampo(campos.telefone, "Informe seu telefone.", "Use o formato (41) 99999-9999."),
        validarCampo(campos.data, "Escolha uma data.", "A data não pode ser anterior a hoje."),
        validarCampo(campos.horario, "Escolha um horário.", "Escolha um horário da lista."),
        validarCampo(campos.pessoas, "Informe o número de pessoas.", "Informe de 1 a 10 pessoas."),
        validarCampo(campos.ambiente[0], "Escolha um ambiente.", "Escolha um ambiente."),
        validarCampo(campos.observacoes, "Escreva uma observação.", "Escreva de 10 a 200 caracteres."),
        validarCampo(campos.aceite, "Marque a autorização para continuar.", "Marque a autorização para continuar.")
    ];
    return !resultados.includes(false);     // só vale se NENHUM deu erro
}

ligarValidacao(formReserva, validarReserva);
ligarContador(campos.observacoes, document.getElementById("contador"));