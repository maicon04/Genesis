/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable no-else-return */
/* eslint-disable no-alert */
/* eslint-disable eqeqeq */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-use-before-define */
/* eslint-disable prefer-const */

const { default: Swal } = require("sweetalert2");

/* eslint-disable spaced-comment */
let order = [];
let clickedOrder = [];
let score = 0;

// 0 - verde
// 1 - vermelho
//2 - amarelo
//3 - azul

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');

//cria ordem aletoria de cores
let shuffleOrder = () => {
  let colorOrder = Math.floor(Math.random() * 4);
  order[order.length] = colorOrder;
  clickedOrder = [];

  for (let i in order) {
    let elementColor = createColorElement(order[i]);
    lightColor(elementColor, Number(i) + 1);
  }
};

//acende a proxima cor
let lightColor = (element, number) => {
  number *= 500;
  setTimeout(() => {
    element.classList.add('selected');
  }, number - 250);
  setTimeout(() => {
    element.classList.remove('selected');
  }, 1000);
};

//checa se os botoes clicados são os mesmos da ordem gerada no jogo
let checkOrder = () => {
  for (let i in clickedOrder) {
    if (clickedOrder[i] != order[i]) {
      gameOver();
      break;
    }
  }
  if (clickedOrder.length == order.length) {
    Swal.fire(`Pontuação: ${score}\nVocê acertou! Iniciando próximo nível!`, 'Deu tudo certo!', 'success');
    nextLevel();
  }
};

//funcao para o clique do usuario
let click = (color) => {
  clickedOrder[clickedOrder.length] = color;
  createColorElement(color).classList.add('selected');

  setTimeout(() => {
    createColorElement(color).classList.remove('selected');
    checkOrder();
  }, 250);
};

//funcao que retorna a cor
let createColorElement = (color) => {
  if (color == 0) {
    return green;
  } else if (color == 1) {
    return red;
  } else if (color == 2) {
    return yellow;
  } else if (color == 3) {
    return blue;
  }
};

//funcao para proximo nivel do jogo
let nextLevel = () => {
  score++;
  shuffleOrder();
};

//funcao para game over
let gameOver = () => {
  Swal.fire(`Pontuação: ${score}!\nVocê perdeu o jogo!\nClique em OK para iniciar um novo jogo`, 'Deu tudo errado!', 'error');
  order = [];
  clickedOrder = [];

  playGame();
};

//funcao de inicio do jogo
let playGame = () => {
  Swal.fire({
    title: 'Bem vindo ao Gênesis!',
    text: 'Iniciando novo jogo!',
    timer: 2000,
    icon: 'info',
    timerProgressBar: true,
  });
  score = 0;

  nextLevel();
};

//eventos de clique para as cores
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

//inicio do jogo
playGame();
