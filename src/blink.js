import { signal } from '@preact/signals-react';
import blink from 'blink-detection/index.js';

export const blinkCount = signal(0);
export const isLoading = signal(true)

var raf;
export const init = async () => {
  const videoElement = document.querySelector('.webcam');

  await blink.loadModel();
  await blink.setUpCamera(videoElement);
  isLoading.value = false

  var piscadas = []
  const predict = async () => {
    let result = await blink.getBlinkPrediction();
    piscadas.push([result.blink, new Date().getTime()])

    piscadas = piscadas.filter((value, index, self) => {
      if (index !== 0) return value[0] !== self[index - 1][0]
      return value
    });
    let count = piscadas.filter(x => x[0] === true);
    blinkCount.value = count
    
    raf = requestAnimationFrame(predict);
  };
  predict();
};