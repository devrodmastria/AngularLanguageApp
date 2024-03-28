import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SpeechService } from './services/speech.service';
import { DictionaryService } from './services/dictionary.service';
import { DictionaryModel } from './Models/dictionary-model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Specialized Language App';

  constructor(public speechService : SpeechService, private dictionaryService: DictionaryService){
    this.speechService.init();
  }

  liveStreaming: boolean = false;

  ngOnInit(){
    this.dictionaryService.getDefinition('camping').subscribe((response:DictionaryModel) => {
        console.log(response);
        
      })
  }

  StartStreaming(): void {

    if(this.liveStreaming){
      this.liveStreaming = !this.liveStreaming;
    
      this.speechService.stopStreaming();
      this.speechService.speechResultList.splice(0, this.speechService.speechResultList.length);
    } 
    else {
      this.liveStreaming = !this.liveStreaming;
      this.speechService.startStreaming();
    }
  }

  DisplayWord(word : string){
    this.dictionaryService.getDefinition(word).subscribe((response:DictionaryModel) => {
      console.log(response);
      alert(`${word}\n\n${response.shortdef[0]}`)
    })
  }

}