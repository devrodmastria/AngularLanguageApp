import { GoogleSigninButtonModule, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [GoogleSigninButtonModule,RouterOutlet, RouterLink, HomeComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user: SocialUser = {} as SocialUser;
  loggedIn: boolean = false;

  title = 'Specialized Language App';

  constructor(private socialAuthServiceConfig: SocialAuthService, private router: Router) { }

  ngOnInit() {
    //authState is a custom observable that will run again any time changes are noticed.
    this.socialAuthServiceConfig.authState.subscribe((userResponse: SocialUser) => {

      this.user = userResponse;

      this.loggedIn = (userResponse != null);

      if(this.loggedIn) {
        this.router.navigate(["home"]); 
      }
    });
  }
  //login component doesn't account for logging out.
  signOut(): void {
    this.socialAuthServiceConfig.signOut();
  }

}
