import { Component, EventEmitter, Output } from '@angular/core';
import { FavoriteWord } from '../../Models/favorite-words';
import { UserTable } from '../../Models/user-table';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from '../../services/database.service';
import { DictionaryService } from '../../services/dictionary.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-favorite-words',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './favorite-words.component.html',
  styleUrl: './favorite-words.component.css'
})
export class FavoriteWordsComponent {
  loggedIn: boolean = false;
  user: SocialUser = {} as SocialUser;
  faveList: FavoriteWord[] = this.dictionaryService.allFavorites;
  playing: boolean = false;

  constructor (private socialAuthServiceConfig: SocialAuthService, private dictionaryService: DictionaryService,
    private router: Router, private databaseService:DatabaseService) {}

  ngOnInit() {

    this.socialAuthServiceConfig.authState.subscribe((userResponse: SocialUser) => {
          this.user = userResponse;
          //if login fails, it will return null.
          this.loggedIn = (userResponse != null);

          if (this.loggedIn == false){
            this.router.navigate(["/login"]);
          }

          if(this.loggedIn == true) {
            this.databaseService.getFavoritesbyId(this.user.id).subscribe((response: FavoriteWord[]) => {
              this.dictionaryService.allFavorites = response;
        });
      }
    })
  }

  PlayAudio(url: string){

    console.log('>>> NOW playing ' + url)

    this.playing = true;
    let audio = new Audio();
    audio.src = url;
    audio.load();
    audio.play();
  }

  DeleteFavorite(id: number) {

    // delete from Azure
    let deleteFavItem = this.dictionaryService.allFavorites.find(f => f.id == id)
    this.databaseService.DeleteFavorites(deleteFavItem!).subscribe()

    // delete from dictionary service
    let indexLocal: number = this.dictionaryService.allFavorites.findIndex(x => x.id == id)
    this.dictionaryService.allFavorites.splice(indexLocal,1);

  }

  UpdateFave(faveItem: FavoriteWord){
    this.databaseService.UpdateFavorites(faveItem).subscribe((response: FavoriteWord) => {
    });
  }
}

