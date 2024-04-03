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
  allUsers: UserTable = {} as UserTable;
  user: SocialUser = {} as SocialUser;
  AllFavorites: FavoriteWord[] = []
  debugMode : boolean = false;

  constructor (private socialAuthServiceConfig: SocialAuthService, private router: Router, private databaseService:DatabaseService) {}

  ngOnInit() {

    if(this.debugMode == false){
      this.socialAuthServiceConfig.authState.subscribe((userResponse: SocialUser) => {
        this.user = userResponse;
        //if login fails, it will return null.
        this.loggedIn = (userResponse != null);
        if (this.loggedIn){
          let newUser : UserTable = {} as UserTable;
          newUser.googleId = userResponse.id;
          newUser.langPreference = "en-US";
          this.databaseService.AddUser(newUser).subscribe((response: UserTable) => {
            console.log(response);
          });
        }
      });
    }
    else {
      this.loggedIn = true;
    }

  }
  signOut(): void {
    this.socialAuthServiceConfig.signOut();
    this.router.navigate([""]); 
  }

  @Output() createEvent = new EventEmitter<FavoriteWord>();
  
  addFavorite(newFave: FavoriteWord): void {
    this.databaseService.addFavorites(newFave).subscribe((response: FavoriteWord) =>{
      this.createEvent.emit(response);
    })
  }
}