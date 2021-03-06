let tempo = $('#segundos');
let tempoInicial = $('#segundos').text();
let campoDigitacao = $('.campo-digitacao');
let frase = $('#frase').text();

$(function () {
    contaPalavrasFrase();
    inputValores();
    iniciaCronometro();
});

function contaPalavrasFrase() {
    let palavrasContadas = frase.split(/\S+/).length;
    $('#palavras').text(palavrasContadas - 1);
}

function contaPalavrasDigitadas() {
    let palavras = campoDigitacao.val().split(/\S+/).length;
    $('.qtd-palavras').text(palavras - 1);
}
function contaCaracteresDigitados() {
    $('.qtd-caracteres').text(campoDigitacao.val().length);
}

function contaSegundos() {
    let tempoRestante = tempo.text();
    let cronometro = setInterval(() => {
        tempo.text(tempoRestante--);
        if (tempoRestante < 0) {
            campoDigitacao.attr('disabled', true);
            $('#btn-reset').attr('disabled', false);
            campoDigitacao.toggleClass('campo-desativado');
            gravaPlacar();
            clearInterval(cronometro);
        }
    }, 1000);
}

function inputValores() {
    campoDigitacao.on('input', function (e) {
        e.preventDefault();
        contaCaracteresDigitados();
        contaPalavrasDigitadas();
        comparaValoresDigitados();
    });
}

function comparaValoresDigitados() {
    if (frase.startsWith(campoDigitacao.val())) {
        campoDigitacao.addClass('borda-certa');
        campoDigitacao.removeClass('borda-errada');
    } else {
        campoDigitacao.addClass('borda-errada');
        campoDigitacao.removeClass('borda-certa');
    }
}

function iniciaCronometro() {
    $('.campo-digitacao').one('focus', function (e) {
        e.preventDefault();
        $('#btn-reset').attr('disabled', true);
        contaSegundos();
    });
}

$('#btn-reset').click(function () {
    campoDigitacao.attr('disabled', false);
    campoDigitacao.val("");
    campoDigitacao.toggleClass('campo-desativado');
    contaPalavrasDigitadas();
    contaCaracteresDigitados();
    tempo.text(tempoInicial);
    iniciaCronometro();
    campoDigitacao.removeClass('borda-certa');
    campoDigitacao.removeClass('borda-errada');
});

function gravaPlacar() {
    let tbody = $('.placar').find('tbody');
    tbody.append(createElement());
}

function createElement() {
    let nomeJogador = "Victtor02";
    let trPai = $('<tr>');
    let colNome = $('<td>');
    let colQtdPalavras = $('<td>');
    let colRemove = $('<td>');
    let link = $('<a>');
    let icone = $('<i>');
    icone.addClass('small material-icons').text('delete');
    link.attr('href', '#').addClass('remove-element');
    link.click(remover);
    colNome.text(nomeJogador);
    colRemove.append(link.append(icone));
    colQtdPalavras.text($('.qtd-palavras').text());
    trPai.append(colNome);
    trPai.append(colQtdPalavras);
    trPai.append(colRemove);
    return trPai;
}

function remover() {
    $(this).parent().parent().remove();
};

