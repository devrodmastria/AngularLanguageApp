import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SpeechService } from './services/speech.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Specialized Language App';

  loggedIn: boolean = true;

}