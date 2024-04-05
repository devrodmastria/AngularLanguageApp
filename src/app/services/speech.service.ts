import { Injectable } from '@angular/core';
declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})
export class SpeechService {


  recognition =  new webkitSpeechRecognition();
  liveStreaming = false;
  tempWords: any;
  languagePref: string = 'en-US';

  speechResultList : string[] = ['demo!'];

  specializedWords : string[] = ["dependency injection", "solid principles", "mutual funds"];

  constructor() { 

    // demon for dictionary filter
    this.filterSpecialWords('and combined words like mutual funds are highlighted in orange')
    this.filterSpecialWords('this is the beginning of a demo where long words mix with hyperlinked colors')
  }

  init() {

    this.recognition.interimResults = false;
    this.recognition.lang = this.languagePref;

    this.recognition.addEventListener('result', (e:any) => {
      const transcript = Array.from(e.results)
        .map((result: any) => result[0])
        .map((result) => result.transcript)
        .join('');

      this.filterSpecialWords(transcript);
      console.log(transcript);
    });
  }

  filterSpecialWords(incoming: string): void {

    let sentence : string[] = incoming.split(' ');

    // find specialized words like 'dependency injection'
    this.specializedWords.forEach( (combo_word) => {

      let specialWord_PartA = combo_word.split(' ')[0];
      let specialWord_PartB = combo_word.split(' ')[1];

      if (sentence.includes(specialWord_PartA)){
        let firstIndex = sentence.indexOf(specialWord_PartA);
        
        // check if the word after 'depenency' is available and is 'injection'
        if (sentence[firstIndex + 1] != undefined && sentence[firstIndex + 1].includes(specialWord_PartB)) {
          // tag special words

          let taggedWord = specialWord_PartA + "-" + specialWord_PartB;

          sentence[firstIndex] = taggedWord;

          // remove trailing word - clean up the tagged word
          sentence.splice(firstIndex+1, 1);

        }
      } 
      else { console.log('>>> special words NOT FOUND')}

    })

    this.speechResultList.push(sentence.join(' '));
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