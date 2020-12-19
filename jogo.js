console.log('[Daniel Castilho] Flappy Bird');

const somDeHIT = new Audio();
somDeHIT.src = './efeitos/hit.wav';

const sprites = new Image();
sprites.src ='./sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

// Plano de Fundo
const planoDeFundo = {
    sourceX: 390,
    sourceY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204,
    desenha() {
        contexto.fillStyle = '#70c5ce';
        contexto.fillRect(0, 0, canvas.width, canvas.height);

        contexto.drawImage(
            sprites,
            planoDeFundo.sourceX, planoDeFundo.sourceY, // Sprite X, Sprite Y
            planoDeFundo.largura, planoDeFundo.altura, // Tamanho do recorte na sprite
            (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura
        );

        contexto.drawImage(
            sprites,
            planoDeFundo.sourceX, planoDeFundo.sourceY, // Sprite X, Sprite Y
            planoDeFundo.largura, planoDeFundo.altura, // Tamanho do recorte na sprite
            planoDeFundo.x, planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura
        );
    },
}

// Chão
const chao = {
    sourceX: 0,
    sourceY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,
    desenha() {
        contexto.drawImage(
            sprites,
            chao.sourceX, chao.sourceY, // Sprite X, Sprite Y
            chao.largura, chao.altura, // Tamanho do recorte na sprite
            chao.x, chao.y,
            chao.largura, chao.altura
        );

        contexto.drawImage(
            sprites,
            chao.sourceX, chao.sourceY, // Sprite X, Sprite Y
            chao.largura, chao.altura, // Tamanho do recorte na sprite
            (chao.x + chao.largura), chao.y,
            chao.largura, chao.altura
        );
    },
};

function fazColisao(flappyBird, chao) {
    const flappyBirdY = flappyBird.y + flappyBird.altura;
    const chaoY = chao.y;

    if (flappyBirdY >= chaoY) {
        return true;
    }
    return false;
}

function criaFlappyBird() {
    const flappyBird = {
        sourceX: 0,
        sourceY: 0,
        largura: 34,
        altura: 24,
        x: 10,
        y: 50,
        pulo: 4.6,
        pula() {
            flappyBird.velocidade = - flappyBird.pulo;
        },
        gravidade: 0.24,
        velocidade:0,
        atualiza() {
            if (fazColisao(flappyBird, chao)) {
                somDeHIT.play();
                setTimeout(() => {
                    mudaParaTela(Telas.INICIO);
                }, 600);
                return;
            }
            flappyBird.velocidade += flappyBird.gravidade;
            flappyBird.y = flappyBird.y + flappyBird.velocidade;
        },
        desenha() {
            contexto.drawImage(
                sprites,
                flappyBird.sourceX, flappyBird.sourceY, // Sprite X, Sprite Y
                flappyBird.largura, flappyBird.altura, // Tamanho do recorte na sprite
                flappyBird.x, flappyBird.y,
                flappyBird.largura, flappyBird.altura
            );
        },
    };
    return flappyBird;
}

// mensagemGetReady
const mensagemGetReady = {
    sX: 134,
    sY:0,
    w: 174,
    h: 152,
    x: (canvas.width / 2) - 174 / 2,
    y: 50,
    desenha() {
        contexto.drawImage(
            sprites,
            mensagemGetReady.sX, mensagemGetReady.sY, // Sprite X, Sprite Y
            mensagemGetReady.w, mensagemGetReady.h, // Tamanho do recorte na sprite
            mensagemGetReady.x, mensagemGetReady.y,
            mensagemGetReady.w, mensagemGetReady.h
        );
    }
};

//
// Telas
//
const globais = {};
let telaAtiva = {};
function mudaParaTela(novaTela) {
    telaAtiva = novaTela;

    if (telaAtiva.inicializa) {
        telaAtiva.inicializa();
    }
}

const Telas = {
    INICIO: {
        inicializa() {
            globais.flappyBird = criaFlappyBird();

        },
        desenha() {
            planoDeFundo.desenha();
            chao.desenha();
            globais.flappyBird.desenha();
            mensagemGetReady.desenha();
        },
        click() {
            mudaParaTela(Telas.JOGO);
        },
        atualiza() {

        }
    }
};

Telas.JOGO = {
    desenha() {
        planoDeFundo.desenha();
        chao.desenha();
        globais.flappyBird.desenha();
    },
    click() {
        globais.flappyBird.pula();
    },
    atualiza() {
        globais.flappyBird.atualiza();
    }
};

function loop() {

    telaAtiva.desenha();
    telaAtiva.atualiza();

    requestAnimationFrame(loop);
}

window.addEventListener('click', () => {
    if (telaAtiva.click) {
        telaAtiva.click();
    }
})

mudaParaTela(Telas.INICIO);
loop();
