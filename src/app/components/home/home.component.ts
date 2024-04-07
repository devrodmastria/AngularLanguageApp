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
      this.speechService.speechResultList = [];
  }

  DisplayWord(word : string): string {
    this.dictionaryService.getDefinition(word).subscribe((response:DictionaryModel[]) => {

      this.selectedWord = word;
      this.selectedDef = response[0].shortdef[0];
      if(response[0].hwi.prs != undefined){
        this.selectedPron = response[0].hwi.prs[0].mw;
        
        let audioKeyPath = response[0].hwi.prs[0].sound;
        if (audioKeyPath != undefined) {

          // audio guidelines - https://dictionaryapi.com/products/json
          // "https://media.merriam-webster.com/audio/prons/[language_code]/[country_code]/[format]/[subdirectory]/[base filename].[format]"

          /*
            if audio begins with "bix", the subdirectory should be "bix",
            if audio begins with "gg", the subdirectory should be "gg",
            if audio begins with a number or punctuation (eg, "_"), the subdirectory should be "number",
            otherwise, the subdirectory is equal to the first letter of audio.
          */

          let subDir = audioKeyPath.audio.substring(0, 3)
          switch ( subDir ) {
            case 'bix':
                // statement 1
                subDir = 'bix'
                break;
            case 'gg':
                subDir = 'gg'
                break;
            case '0':
              case '1':
                case '2':
                  case '3':
                    case '4':
                      case '5':
                        case '6':
                          case '7':
                            case '8':
                              case '9':
                                case '_':
                                  subDir = 'number'
                                  break;
            default: 
              subDir = subDir.substring(0,1);
                break;
         }

          let fullUrl = `https://media.merriam-webster.com/audio/prons/en/us/mp3/${subDir}/${audioKeyPath.audio}.mp3`

          //complete url
          this.selectedAudio = fullUrl;


        }
      }
      else{
        this.selectedPron = "pronunciation not found";
      }
    })
    return this.selectedDef; // for tooltip
  }

  DisplayWordCombo(word : string): void{

    this.selectedWord = word.replace("-", " ");
    this.selectedDef = "ToDo - custom database with specialized terms"
  }

  ClearSelection():void {
    this.selectedWord = "";
    this.selectedDef = "";

  }

  addFavorite(): void {
    let newFav: FavoriteWord = {} as FavoriteWord
    newFav.word = this.selectedWord;
    newFav.definition = this.selectedDef;
    newFav.phonetics = this.selectedPron;
    newFav.userId = this.user.id;
    newFav.source = "Merriam-Webster";
    newFav.audioSource = this.selectedAudio;
    newFav.id = Date.now();

    //save in temporary memory
    this.dictionaryService.allFavorites.push(newFav);

    this.databaseService.addFavorites(newFav).subscribe((response: FavoriteWord) =>{
      console.log(response);
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
