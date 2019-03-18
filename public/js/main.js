contaPalavrasFrase();
let campoTempo = $('#segundos');
let contador = {};
let intervalo;





function contaPalavrasFrase() {
    $('#palavras').text(contacaoDePalavras('#frase'));
}

function contaPalavrasDigitadas() {
    $('.qtd-palavras').text(contacaoDePalavrasInput('.campo-digitacao'));
}
function contacaoDePalavras(id) {
    let palavras = $(id).text().split(/\S+/);
    return palavras.length - 1;
}
function contacaoDePalavrasInput(id) {
    let palavras = $(id).val().split(/\S+/);
    return palavras.length - 1;
}

contador.stop = function () {
    clearInterval(intervalo);
}
function gameOver() {
    contador.stop();
    $('.campo-digitacao').attr('disabled', 'true');
}

function contaSegundos() {
    let tempo = campoTempo.text();
    intervalo = setInterval(() => {
        campoTempo.text(tempo--);
        if (tempo < 0) {
            gameOver();
        }
    }, 1000);
}


$('.campo-digitacao').on('input', function (e) {
    e.preventDefault();
    let campo = $('.campo-digitacao').val();
    $('.qtd-caracteres').text(campo.length);
    contaPalavrasDigitadas();
});
$('.campo-digitacao').one('focus',function (e) {
    e.preventDefault();
    contaSegundos();
});

