import { Component, EventEmitter, Output } from '@angular/core';
import { FavoriteWord } from '../../Models/favorite-words';
import { UserTable } from '../../Models/user-table';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-favorite-words',
  standalone: true,
  imports: [],
  templateUrl: './favorite-words.component.html',
  styleUrl: './favorite-words.component.css'
})
export class FavoriteWordsComponent {
  loggedIn: boolean = false;
  allFavorites:FavoriteWord[] = [];
  user: SocialUser = {} as SocialUser;

  constructor (private socialAuthServiceConfig: SocialAuthService, private router: Router, private databaseService:DatabaseService) {}

  ngOnInit() {
    this.socialAuthServiceConfig.authState.subscribe((userResponse: SocialUser) => {
      this.user = userResponse;
      //if login fails, it will return null.
      this.loggedIn = (userResponse != null);

      if(this.loggedIn == true) {
        this.databaseService.getFavoritesbyId(this.user.id).subscribe((response: FavoriteWord[]) => {
          this.allFavorites = response; 

    });
  }
})
  }

  DeleteFavorite(id: number) {
    let deleteFavItem = this.allFavorites.find(f => f.id == id)
    
    let index: number = this.allFavorites.findIndex(x => x.id == id)
    this.allFavorites.splice(index,1);
  
    this.databaseService.DeleteFavorites(deleteFavItem!).subscribe()
  }
}

