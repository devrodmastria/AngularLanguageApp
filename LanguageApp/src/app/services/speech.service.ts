import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpeechService {


  // INJECT cloud-speech.js here
  // update credentials in cloud-speech.js
  constructor() { }

  getResults():string{
    return "sample caption";
  }

}
