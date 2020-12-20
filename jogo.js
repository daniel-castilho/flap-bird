console.log('[Daniel Castilho] Flappy Bird');

let frames = 0;
const somDeHIT = new Audio();
somDeHIT.src = './efeitos/hit.wav';

const sprites = new Image();
sprites.src ='./sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

// Plano de Fundo
function criaPlanoDeFundo() {
    const planoDeFundo = {
        sourceX: 391,
        sourceY: 0,
        largura: 275,
        altura: 204,
        x: 0,
        y: canvas.height - 204,
        atualiza() {
            const movimentoDoFundo = 1;
            const repeteEm = planoDeFundo.largura / 2;
            const movimentacao = planoDeFundo.x - movimentoDoFundo;
            planoDeFundo.x = movimentacao % repeteEm;
        },
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
    };
    return planoDeFundo;
}


// Chão
function criaChao() {
    const chao = {
        sourceX: 0,
        sourceY: 610,
        largura: 224,
        altura: 112,
        x: 0,
        y: canvas.height - 112,
        atualiza() {
            const movimentoDoChao = 2;
            const repeteEm = chao.largura / 2;
            const movimentacao = chao.x - movimentoDoChao;
            chao.x = movimentacao % repeteEm;
        },
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
    return chao;
}

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
            if (fazColisao(flappyBird, globais.chao)) {
                somDeHIT.play();
                mudaParaTela(Telas.GAME_OVER);
                return;
            }
            flappyBird.velocidade += flappyBird.gravidade;
            flappyBird.y = flappyBird.y + flappyBird.velocidade;
        },
        movimentos: [
            { sourceX: 0, sourceY: 0, }, // asa pra cima
            { sourceX: 0, sourceY: 26, }, // asa no meio 
            { sourceX: 0, sourceY: 52, }, // asa pra baixo
            { sourceX: 0, sourceY: 26, }, // asa no meio 
        ],
        frameAtual: 0,
        atualizaFrameAtual() {
            const intervaloDeFrames = 10;
            const passouIntervalo = frames % intervaloDeFrames === 0;
            // console.log('passouIntervalo', passouOIntervalo)

            if (passouIntervalo) {
                const baseDoIncremento = 1;
                const incremento = baseDoIncremento + flappyBird.frameAtual;
                const baseRepeticao = flappyBird.movimentos.length;
                flappyBird.frameAtual = incremento % baseRepeticao;

                // console.log('[incremento]', incremento);
                // console.log('[baseRepeticao]',baseRepeticao);
                // console.log('[frame]', incremento % baseRepeticao);
            }
        },
        desenha() {
            flappyBird.atualizaFrameAtual();
            const { sourceX, sourceY } = flappyBird.movimentos[flappyBird.frameAtual];
            contexto.drawImage(
                sprites,
                sourceX, sourceY, // Sprite X, Sprite Y
                flappyBird.largura, flappyBird.altura, // Tamanho do recorte na sprite
                flappyBird.x, flappyBird.y,
                flappyBird.largura, flappyBird.altura,
            );
        }
    }
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

// mensagemGameOver
const mensagemGameOver = {
    sX: 134,
    sY: 153,
    w: 226,
    h: 200,
    x: (canvas.width / 2) - 226 / 2,
    y: 50,
    desenha() {
        contexto.drawImage(
            sprites,
            mensagemGameOver.sX, mensagemGameOver.sY, // Sprite X, Sprite Y
            mensagemGameOver.w, mensagemGameOver.h, // Tamanho do recorte na sprite
            mensagemGameOver.x, mensagemGameOver.y,
            mensagemGameOver.w, mensagemGameOver.h
        );
    }
};

function criaCanos() {
    const canos = {
        largura: 52,
        altura: 400,
        chao: {
            sourceX: 0,
            sourceY: 169
        },
        ceu: {
            sourceX: 52,
            sourceY: 169
        },
        espaco: 80,
        desenha() {
            canos.pares.forEach(function(par) {
                const yRandom = par.y;
                const espacamentoEntreCanos = 90;

                const canoCeuX = par.x;
                const canoCeuY = yRandom;

                contexto.drawImage(
                    sprites,
                    canos.ceu.sourceX, canos.ceu.sourceY,
                    canos.largura, canos.altura,
                    canoCeuX, canoCeuY,
                    canos.largura, canos.altura,
                )

                const canoChaoX = par.x;
                const canoChaoY = canos.altura + espacamentoEntreCanos + yRandom;
                contexto.drawImage(
                    sprites,
                    canos.chao.sourceX, canos.chao.sourceY,
                    canos.largura, canos.altura,
                    canoChaoX, canoChaoY,
                    canos.largura, canos.altura,
                )

                par.canoCeu = {
                    x: canoCeuX,
                    y: canos.altura + canoCeuY
                }
                par.canoChao = {
                    x: canoChaoX,
                    y: canoChaoY
                }
            })
        },
        temColisaoComFlappyBird(par) {
            const cabecaDoFlappy = globais.flappyBird.y;
            const peDoFlappy = globais.flappyBird.y + globais.flappyBird.altura;

            if ((globais.flappyBird.x + globais.flappyBird.largura - 5) >= par.x) {
                if (cabecaDoFlappy <= par.canoCeu.y) {
                    return true;
                }

                if (peDoFlappy >= par.canoChao.y) {
                    return true;
                }
            }

            return false;
        },
        pares: [],
        atualiza() {
            const passou100Frames = frames % 100 === 0;
            if (passou100Frames) {
                canos.pares.push({
                    x: canvas.width,
                    y: -150 * (Math.random() +1),
                });
            }

            canos.pares.forEach(function(par) {
                par.x = par.x - 2;

                if (canos.temColisaoComFlappyBird(par)) {
                    somDeHIT.play();
                    mudaParaTela(Telas.GAME_OVER);
                    return;
                }

                if (par.x + canos.largura <= 0) {
                    canos.pares.shift();
                }
            });
        }
    }
    return canos;
}

function criaPlacar() {
    const placar = {
        pontuacao: 0,
        desenha() {
            contexto.font = '35px "VT323"';
            contexto.textAlign = 'right';
            contexto.fillStyle = 'white';
            contexto.fillText(`Score ${placar.pontuacao}` , canvas.width - 10, 35);
        },
        atualiza() {
            const intervaloDeFrames = 10;
            const passouIntervalo = frames % intervaloDeFrames === 0;

            if (passouIntervalo) {
                placar.pontuacao = placar.pontuacao + 10;
            }
        }
    }


    return placar;
}

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
            globais.planoDeFundo = criaPlanoDeFundo();
            globais.flappyBird = criaFlappyBird();
            globais.chao = criaChao();
            globais.canos = criaCanos();
        },
        desenha() {
            globais.planoDeFundo.desenha();
            globais.flappyBird.desenha();
            globais.chao.desenha();
            mensagemGetReady.desenha();
        },
        click() {
            mudaParaTela(Telas.JOGO);
        },
        atualiza() {
            globais.chao.atualiza();
            globais.planoDeFundo.atualiza();
        }
    }
};

Telas.JOGO = {
    inicializa() {
        globais.placar = criaPlacar();
    },
    desenha() {
        globais.planoDeFundo.desenha();
        globais.canos.desenha();
        globais.chao.desenha();
        globais.flappyBird.desenha();
        globais.placar.desenha();
    },
    click() {
        globais.flappyBird.pula();
    },
    atualiza() {
        globais.canos.atualiza();
        globais.chao.atualiza();
        globais.flappyBird.atualiza();
        globais.placar.atualiza();
    }
};

Telas.GAME_OVER = {
    desenha() {
        mensagemGameOver.desenha();
    },
    atualiza() {

    },
    click() {
        mudaParaTela(Telas.INICIO);
    }
}

function loop() {

    telaAtiva.desenha();
    telaAtiva.atualiza();

    frames = frames + 1;
    requestAnimationFrame(loop);
}

window.addEventListener('click', () => {
    if (telaAtiva.click) {
        telaAtiva.click();
    }
})

mudaParaTela(Telas.INICIO);
loop();
