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

  selectedWord : string = "";

  selectedPron : string = "";

  selectedDef : string = "";

  ngOnInit(){
    this.dictionaryService.getDefinition('camping').subscribe((response:DictionaryModel[]) => {
        console.log('Testing Dictionary API: ' + response[0].shortdef[0]);
        
      })
  }

  StartStreaming(): void {

    if(this.liveStreaming){
      this.liveStreaming = !this.liveStreaming;
    
      this.speechService.stopStreaming();
    } 
    else {
      this.liveStreaming = !this.liveStreaming;
      this.speechService.startStreaming();
    }
  }

  ClearResults(): void {
      // clear results from screen
      this.speechService.speechResultList.splice(0, this.speechService.speechResultList.length);
  }

  DisplayWord(word : string): void{
    this.dictionaryService.getDefinition(word).subscribe((response:DictionaryModel[]) => {
      this.selectedWord = word;
      this.selectedDef = response[0].shortdef[0];
      if(response[0].hwi.prs != undefined){
        this.selectedPron = response[0].hwi.prs[0].mw;
      }
      else{
        this.selectedPron = "pronunciation not found";
      }
      // this.selectedPron = response[0].hwi.prs?[0].mw ?? "pronunciation not found";
    })
  }
  addFav():void{

  }
}