import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { SpeechService } from '../../services/speech.service';
import { DictionaryService } from '../../services/dictionary.service';
import { DictionaryModel } from '../../Models/dictionary-model';
import { FavoriteWord } from '../../Models/favorite-words';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { DatabaseService } from '../../services/database.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(public speechService : SpeechService, private dictionaryService: DictionaryService, 
    private socialAuthServiceConfig: SocialAuthService, private router: Router, private databaseService: DatabaseService){
    this.speechService.init();
  }

  liveStreaming: boolean = false;
  loggedIn: boolean = true;

  user:SocialUser = {} as SocialUser

  AllFavorites: FavoriteWord[] = []

  selectedWord : string = "";
  selectedPron : string = "";
  selectedDef : string = "Click on a highlighted word to get started";
  selectedWordId: string = "";

  @Output() createEventFave = new EventEmitter<FavoriteWord>();

  ngOnInit(){
    this.socialAuthServiceConfig.authState.subscribe((u:SocialUser) => {
      this.user = u;
      this.loggedIn = (this.user != null);

      if (this.loggedIn == false){
        this.router.navigate(["/"]);
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
    })
  }

  DisplayWordCombo(word : string): void{

    this.selectedWord = word.replace("-", " ");
    this.selectedDef = "this will require a custom database or API !"
  }

  addFavorite(): void {
    let newFav: FavoriteWord = {} as FavoriteWord
    newFav.word = this.selectedWord;
    newFav.definition = this.selectedDef;
    newFav.phonetics = this.selectedPron;
    newFav.userId = this.user.id;
    newFav.source = "Merriam-Webster";

    this.databaseService.addFavorites(newFav).subscribe((response: FavoriteWord) =>{
      this.createEventFave.emit(response);
    })
    
  };

}
