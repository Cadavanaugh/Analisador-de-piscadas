import blink from 'blink-detection/index.js'

let piscadas = [];

self.onmessage = async (event) => {
  if (event.data.type === 'start') {

    await blink.loadModel();
    await blink.setUpCamera();

    const predict = async (videoFrame) => {
      let result = await blink.getBlinkPrediction(videoFrame);
      piscadas.push([result.blink, new Date().getTime()]);

      piscadas = piscadas.filter((value, index, self) => {
        if (index !== 0) return value[0] !== self[index - 1][0];
        return value;
      });

      let count = piscadas.filter(x => x[0] === true).length;

      self.postMessage({ blinkCount: count });

      requestAnimationFrame(() => predict(videoFrame));
    };

    predict(event.data.videoFrame);
  }
};