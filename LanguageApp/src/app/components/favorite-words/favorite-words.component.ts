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
    });
    this.getFavorite();
  }

  getFavorite(){
    this.databaseService.getFavorites().subscribe((response:FavoriteWord[]) =>{
      this.allFavorites = response;
    });
  }
}

