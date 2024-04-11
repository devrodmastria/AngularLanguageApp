import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { SpeechService } from '../../services/speech.service';
import { DictionaryService } from '../../services/dictionary.service';
import { DictionaryModel } from '../../Models/dictionary-model';
import { FavoriteWord } from '../../Models/favorite-words';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { DatabaseService } from '../../services/database.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon'
import {MatSliderModule} from '@angular/material/slider';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [RouterOutlet, RouterLink, MatTooltipModule, MatIconModule, MatSliderModule, 
    FormsModule, MatCheckboxModule],

})
export class HomeComponent {

  constructor(public speechService : SpeechService, private dictionaryService: DictionaryService, 
    private socialAuthServiceConfig: SocialAuthService, private router: Router, private databaseService: DatabaseService){
    this.speechService.init();
  }

  liveStreaming: boolean = false;
  loggedIn: boolean = false;

  speechKitCompatible = 'webkitSpeechRecognition' in window;

  user:SocialUser = {} as SocialUser

  selectedWord : string = "";
  selectedPron : string = "";
  selectedDef : string = "Click on a highlighted word to get started";
  selectedAudio : string = "";

  hyperlink_minLength : number = 5;
  hyperlinkMaxLength : number = 15;
  hyperlinkContrast: boolean = false;

  ngOnInit(){
    
    this.socialAuthServiceConfig.authState.subscribe((u:SocialUser) => {
      this.user = u;
      this.loggedIn = (this.user != null);

      if (this.loggedIn == false){
        this.router.navigate(["/login"]);
      }
    })
  }

  StartStreaming(): void {

    if(this.speechKitCompatible){

      if(this.liveStreaming){
        this.liveStreaming = !this.liveStreaming;
      
        this.speechService.stopStreaming();
      } 
      else {
        this.liveStreaming = !this.liveStreaming;
        this.speechService.startStreaming();
      }      

    }
    else 
    {
      alert("Sorry! Browser not compatible with our speech services")
    }


  }

  ClearResults(): void {
      // clear results from screen
      this.speechService.speechResultList = [];
  }

  DisplayWordCombo(word : string): void{

    this.selectedWord = word.replace("-", " ");
    this.selectedDef = "ToDo - custom database with specialized terms"
  }

  DisplayWord(word : string): string {

    if(this.dictionaryService.hasDefinition(word) == false) {

        this.dictionaryService.getDefinition(word).subscribe((response:DictionaryModel[]) => {


          let localWord : FavoriteWord = {} as FavoriteWord;
          localWord.word = word
          localWord.definition = response[0].shortdef[0];
            
          if(response[0].hwi.prs != undefined){

            localWord.phonetics = response[0].hwi.prs[0].mw;

            let audioKeyPath = response[0].hwi.prs[0].sound;
            if (audioKeyPath != undefined) {
              
              let subDir = audioKeyPath.audio.substring(0, 3)

              // parse audio URL for dictionary API
              localWord.audioSource = this.dictionaryService.parseAudioUrl(audioKeyPath.audio, subDir);

            }
          }
          else{

            localWord.phonetics = "pronunciation not found";

          }

          this.selectedWord = localWord.word;
          this.selectedDef = localWord.definition
          this.selectedPron = localWord.phonetics
          this.selectedAudio = localWord.audioSource
          this.dictionaryService.localDefinitions.push(localWord)

        })
    } else {

      let localWord = this.dictionaryService.localDefinitions.find(item => item.word == word)
      if (localWord != undefined){
        this.selectedWord = localWord.word;
        this.selectedDef = localWord.definition
        this.selectedPron = localWord.phonetics
        this.selectedAudio = localWord.audioSource
      }

    }

    return this.selectedDef; // for tooltip
  }

  addFavorite(): void {
    let newFav: FavoriteWord = {} as FavoriteWord
    newFav.word = this.selectedWord;
    newFav.definition = this.selectedDef;
    newFav.phonetics = this.selectedPron;
    newFav.userId = this.user.id;
    newFav.source = "Merriam-Webster";
    newFav.audioSource = this.selectedAudio;
    newFav.id = 0

    this.databaseService.addFavorites(newFav).subscribe((response: FavoriteWord) =>{
      console.log('>>> Azure DB response: ' + response.word);

      //save in temporary memory
      this.dictionaryService.allFavorites.push(response);
    })
    
  };

  // accessibility
  flipColorStyle(): void {

    const word_combo = document.getElementsByClassName('hyper-word-combo') as HTMLCollectionOf<HTMLElement>
    const word_single = document.getElementsByClassName('hyper-word') as HTMLCollectionOf<HTMLElement>

    const defaultColor = '#1976d2' // palette.primary.main - src: https://mui.com/material-ui/customization/palette/

    if(this.hyperlinkContrast == false){
      this.hyperlinkContrast = true

      for (let index = 0; index < word_combo.length; index++) {
        const element = word_combo[index];
        element.style.backgroundColor = 'yellow'; 
        element.style.color = 'purple'
        element.style.textDecorationColor = 'purple'
      }
      for (let index = 0; index < word_single.length; index++) {
        const element = word_single[index];
        element.style.backgroundColor = 'purple'; 
        element.style.color = 'yellow'
        element.style.textDecorationColor = 'yellow'
      }


    } else {
      this.hyperlinkContrast = false

      for (let index = 0; index < word_combo.length; index++) {
        const element = word_combo[index];
        element.style.backgroundColor = 'lightskyblue'; 
        element.style.color = defaultColor
        element.style.textDecorationColor = defaultColor
      }
      for (let index = 0; index < word_single.length; index++) {
        const element = word_single[index];
        element.style.backgroundColor = 'lightsalmon'; 
        element.style.color = defaultColor
        element.style.textDecorationColor = defaultColor
      }

    }

  }

}
