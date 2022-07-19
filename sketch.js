//Estados de jogo
var PLAY = 1;
var END = 0;
var gameState = PLAY;

//Persongem
var menino, meninoImg;

//Inimigos
var inimigos;
var tvImg,gameImg, raqueteImg;

//Itens para pontuar
var pontos;
var bookImg, borrachaImg, canetaImg;

//Fundo
var fundo, fundoImg;

//Pontuação
var score = 0;
var distracao = 0;


function preload(){
    //Imagem do personagem
    meninoImg = loadImage("MENINO.png");

    //Imagem dos inimigos
    tvImg = loadImage("tv.png");
    gameImg = loadImage ("game.png");
    bookImg = loadImage ("book.png");
    raqueteImg = loadImage("raquete.png");

    //Imagem de fundo
    fundoImg = loadImage("fundo.png");
    
    //Imagem de itens para pontuar
    bookImg = loadImage("book.png");
    canetaImg = loadImage("pen.png");
    borrachaImg = loadImage ("borracha.png");

}

function setup() {
    //Tela
    createCanvas (1000,400);

    //Criando sprite de fundo
    fundo = createSprite (600,200,600,20);
    fundo.addImage(fundoImg);

    //Sprite do personagem princiapl
    menino = createSprite(50,350,20,20);
    menino.addImage(meninoImg);
    menino.scale = 0.1;
    
    //Criando grupos de inimigos e de itens para pontuar
    inimigosGrupo = new Group();
    pontosGrupo = new Group();
 
}

function draw() {

    //Cor de fundo
    background("white");    

    //Estado de jogo play
    if (gameState === PLAY){

        //Movimento do fundo
        fundo.velocityX = -(4 + (score/10));

        //Recofiguração de fundo infinito
        if (fundo.x < 100){
            fundo.x = 600
        }

        //Movimento do personagem com o mouse
        menino.y = mouseY;
        menino.x = mouseX;

        //Funções para gerar inimigos e itens de pontos
        gereInimigos();
        gerePontos();

        //Condicional para aumentar pontos
        if (pontosGrupo.isTouching(menino)){
            score = score +10;
            pontos.destroy();
        }

        //Condicional para aumentar distrações
        if (inimigosGrupo.isTouching(menino)){
            distracao = distracao +10;
            inimigos.destroy();
        }

        //Condicional para mudar para estado end
        if (distracao >= 100 || score >= 200){
            gameState = END;  
            fundo.velocityX = 0;
        }
        //Desenhar sprites
        drawSprites(); 
    
    }//Estado de jogo end
    else if (gameState === END){     

        //Perder
        if (distracao >=100){
            textSize(50);
            fill("black");
            text ("Você perdeu!!! Ficou muito distraído!!!", 100,200); 
        }//Ganhar
        else if (score >= 200){
            textSize(50);
            fill("black");
            text ("Você Ganhou!!! Focou nos estudos!!!", 100,200); 
            text ("PARABÉNS!!!", 300,250); 
        }
        
    }   
    
    textSize(30);
    fill("purple");
    text("Hora da Leitura", 30,40);
    
    textSize(15);
    fill("green");
    text("Pontos: "+score, 30,60);

    textSize(15);
    fill("red");
    text("Distrações: "+distracao, 30,80);
}


function gereInimigos(){
    
    //Gerar inimigos a cada 120 quadros
    if (frameCount%120 === 0){
        inimigos = createSprite(1100,random (0,350),20,20);
        inimigos.scale = 0.08;
        inimigos.velocityX = -(5 + (score/10));

        //Adicionar imagens aleatórias dos inimigos
        var aleatorio = Math.round(random(1,3));
        switch (aleatorio){
            case 1: inimigos.addImage(tvImg);
            break;
            case 2: inimigos.addImage(gameImg);
            break;
            case 3: inimigos.addImage(raqueteImg);
            break;
            default: break;
        }
        //Evitar vazamento de memória  
        inimigos.lifetime = 300;
        //Adicionando sprites inimigos no grupo
        inimigosGrupo.add(inimigos);
    }
}

function gerePontos(){

    //Gerar itens de pontos a cada 120 quadros
    if (frameCount%120 === 0){
        pontos = createSprite(1100,random (0,350),20,20);
        pontos.scale = 0.1;
        pontos.velocityX = -(5 + (score/10));

        //Adicionar imagens aleatórias dos itens de pontuar
        var aleatorio = Math.round(random(1,3));
        switch (aleatorio){
            case 1: pontos.addImage(borrachaImg);
            break;
            case 2: pontos.addImage(canetaImg);
            break;
            case 3: pontos.addImage(bookImg);
            break;
            default: break;
        }
        //Evitar vazamento de memória        
        pontos.lifetime = 300;
        //Adicionando sprites pontos no grupo
        pontosGrupo.add(pontos);
    }

}