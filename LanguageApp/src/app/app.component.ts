import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { SpeechService } from './services/speech.service';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { LoginComponent } from './components/login/login.component';
import { FavoriteWord } from './Models/favorite-words';
import { UserTable } from './Models/user-table';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from './services/database.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, LoginComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Specialized Language App';

  loggedIn: boolean = false;
  allFavorites:FavoriteWord[] = [];
  allUsers: UserTable = {} as UserTable;
  user: SocialUser = {} as SocialUser;

  constructor (private socialAuthServiceConfig: SocialAuthService, private router: Router, private databaseService:DatabaseService) {}

  ngOnInit() {
    this.socialAuthServiceConfig.authState.subscribe((userResponse: SocialUser) => {
      this.user = userResponse;
      //if login fails, it will return null.
      this.loggedIn = (userResponse != null);
    });
  }


  @Output() createEvent = new EventEmitter<FavoriteWord>();
  
  addFavorite(newFave: FavoriteWord): void {
    this.databaseService.addFavorites(newFave).subscribe((response: FavoriteWord) =>{
      this.createEvent.emit(response);
    })
  }
}