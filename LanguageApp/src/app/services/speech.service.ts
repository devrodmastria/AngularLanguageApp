import { Injectable } from '@angular/core';
declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})
export class SpeechService {


  recognition =  new webkitSpeechRecognition();
  liveStreaming = false;
  tempWords: any;

  speechResultList : string[] = [];

  constructor() { }

  init() {

    this.recognition.interimResults = false;
    this.recognition.lang = 'en-US';

    this.recognition.addEventListener('result', (e:any) => {
      const transcript = Array.from(e.results)
        .map((result: any) => result[0])
        .map((result) => result.transcript)
        .join('');

      this.speechResultList.push(transcript);
      console.log(transcript);
    });
  }

  startStreaming() {
    this.liveStreaming = true;
    this.recognition.start();
    console.log("Speech recognition started")
    this.recognition.addEventListener('end', (condition: any) => {
      if (this.liveStreaming) {
        this.recognition.start(); //restart speech engine
        console.log("Restarting speech recognition")
      }
    });
  }
  stopStreaming() {
    this.liveStreaming = false;
    this.recognition.stop();
    console.log("End speech recognition")
  }
}