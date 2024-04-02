import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { SpeechService } from './services/speech.service';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { LoginComponent } from './components/login/login.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Specialized Language App';

  loggedIn: boolean = false;
  user: SocialUser = {} as SocialUser;

  constructor (private socialAuthServiceConfig: SocialAuthService, private router: Router) {}

  ngOnInit() {
    this.socialAuthServiceConfig.authState.subscribe((userResponse: SocialUser) => {
      this.user = userResponse;
      //if login fails, it will return null.
      this.loggedIn = (userResponse != null);
    });
  }
}