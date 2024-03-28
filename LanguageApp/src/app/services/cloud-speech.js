// speech API for Node.js
const gc_recorder = require('node-record-lpcm16');
const googleSpeech = require('@google-cloud/speech');
const speechClient = new googleSpeech.SpeechClient({
    keyFilename: './studybuddyangular.json'
  });

const encoding = 'LINEAR16';
const sampleRateHz = 16000;
const languageCode = 'en-US';

const speechRequest = {
  config: {
    encoding: encoding,
    sampleRateHertz: sampleRateHz,
    languageCode: languageCode,
  },
  interimResults: true, //shows partial captions as user speaks
};

const recognizeStream = speechClient
.streamingRecognize(speechRequest)
.on('error', console.error)
.on('data', (data) =>
  process.stdout.write(
    data.results[0] && data.results[0].alternatives[0]
      ? `Transcription: ${data.results[0].alternatives[0].transcript}\n`
      : '\n\nReached transcription time limit, press Ctrl+C\n'
  )
);

gc_recorder
    .record({
    sampleRateHertz: sampleRateHz,
    threshold: 0,
    verbose: false,
    recordProgram: 'rec',
    silence: '5.0',
    })
    .stream()
    .on('error', console.error)
    .pipe(recognizeStream);

console.log('>>> Press Ctrl C to stop streaming');