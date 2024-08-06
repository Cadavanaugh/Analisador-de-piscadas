importScripts('./blink.js');

let time = 0;

function startTimer() {
  setInterval(() => {
    time += 1;
    postMessage(time); // Envia a contagem de tempo para o App.jsx
  }, 1000);
}

async function initialize() {
  await self.init(); // Chama a função init de blink.js
  startTimer(); // Inicia o temporizador após a inicialização
}

initialize();