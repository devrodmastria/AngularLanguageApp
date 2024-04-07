import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { GoogleSigninButtonModule, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { LoginComponent } from './components/login/login.component';
import { UserTable } from './Models/user-table';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from './services/database.service';
import { SpeechService } from './services/speech.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, LoginComponent, FormsModule, GoogleSigninButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Assistive Learning App';
  loggedIn: boolean = false;
  debugMode : boolean = false;

  constructor (private socialAuthServiceConfig: SocialAuthService, public speechService: SpeechService,
    private router: Router, private databaseService:DatabaseService) {}

  ngOnInit() {

    if (this.loggedIn == false){
      this.router.navigate(["/login"]);
    }

    this.socialAuthServiceConfig.authState.subscribe((userResponse: SocialUser) => {
      //if login fails, it will return null.
      this.loggedIn = (userResponse != null);

      let localUser: UserTable = {} as UserTable;
      localUser.googleId = userResponse.id;
      localUser.langPreference = "en-US";
      localUser.favoriteWords = [];

      this.databaseService.AddUser(localUser).subscribe((response: UserTable) => {
        console.log(response);
      });

    });

  }

  setLanguage(lang: string):void {
    this.speechService.languagePref = lang;
    if(this.speechService.liveStreaming){
      alert('Please restart streaming to apply language.')
    }
  }

  signOut(): void {
    this.socialAuthServiceConfig.signOut();
    this.router.navigate([""]); 
  }
}