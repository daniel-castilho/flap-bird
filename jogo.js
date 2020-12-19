console.log('[Daniel Castilho] Flappy Bird');

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

const flappyBird = {
    sourceX: 0,
    sourceY: 0,
    largura: 34,
    altura: 24,
    x: 10,
    y: 50,
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

function loop() {

    planoDeFundo.desenha();
    chao.desenha();
    flappyBird.desenha();


    requestAnimationFrame(loop);
}

loop();
