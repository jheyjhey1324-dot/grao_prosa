/* Grão & Prosa - formAction.js
   Lê os dados enviados por GET (o que vem depois do "?" na URL)
   e mostra a confirmação. */

const parametros = new URLSearchParams(window.location.search);
const tipoEnvio = parametros.get("tipo");        // "reserva" ou "avaliacao"

const tituloResultado = document.getElementById("titulo-resultado");
const mensagemResultado = document.getElementById("mensagem-resultado");
const caixaResumo = document.getElementById("caixa-resumo");
const listaResumo = document.getElementById("lista-resumo");

const nomesAmbiente = { salao: "Salão", varanda: "Varanda", balcao: "Balcão" };

// Pega um dado da URL (texto vazio se não existir)
function pegar(nome) {
    return parametros.get(nome) || "";
}

// "2026-11-20" -> "20/11/2026"
function formatarData(texto) {
    return texto.split("-").reverse().join("/");
}

// "4" -> "★★★★☆ (4 de 5)"
function formatarNota(texto) {
    const nota = Math.min(5, Math.max(0, Number(texto) || 0));
    return "★".repeat(nota) + "☆".repeat(5 - nota) + " (" + nota + " de 5)";
}

// Cria as linhas "rótulo: valor" do resumo.
// Usa textContent (e não innerHTML): a URL pode ser editada por qualquer pessoa,
// e assim tudo que vier dela é tratado só como texto, nunca como código.
function mostrarResumo(linhas) {
    for (const linha of linhas) {
        const termo = document.createElement("dt");
        termo.textContent = linha.rotulo;

        const valor = document.createElement("dd");
        valor.textContent = linha.valor;

        listaResumo.append(termo, valor);
    }
    caixaResumo.hidden = false;
}

const primeiroNome = pegar("nome").split(" ")[0];

if (tipoEnvio === "reserva") {
    tituloResultado.textContent = "Reserva recebida!";
    mensagemResultado.textContent = "Guardamos um lugar para você, " + primeiroNome + ".";
    mostrarResumo([
        { rotulo: "Nome", valor: pegar("nome") },
        { rotulo: "E-mail", valor: pegar("email") },
        { rotulo: "Telefone", valor: pegar("telefone") },
        { rotulo: "Data", valor: formatarData(pegar("data")) },
        { rotulo: "Horário", valor: pegar("horario") },
        { rotulo: "Pessoas", valor: pegar("pessoas") },
        { rotulo: "Ambiente", valor: nomesAmbiente[pegar("ambiente")] || pegar("ambiente") },
        { rotulo: "Observações", valor: pegar("observacoes") }
    ]);
} else if (tipoEnvio === "avaliacao") {
    tituloResultado.textContent = "Avaliação recebida!";
    mensagemResultado.textContent = "Agradecemos o seu comentário, " + primeiroNome + "!";
    mostrarResumo([
        { rotulo: "Nome", valor: pegar("nome") },
        { rotulo: "Data da visita", valor: formatarData(pegar("data")) },
        { rotulo: "Nota", valor: formatarNota(pegar("avaliacao")) },
        { rotulo: "Comentário", valor: pegar("comentario") }
    ]);
} else {
    tituloResultado.textContent = "Nenhum dado recebido";
    mensagemResultado.textContent = "Preencha um dos formulários do site para ver a confirmação aqui.";
}

// o título da aba acompanha o resultado
document.title = "Grão & Prosa | " + tituloResultado.textContent;