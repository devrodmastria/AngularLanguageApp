import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SpeechService } from './services/speech.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Specialized Language App';

  constructor(private speechService : SpeechService){}

  liveStreaming: boolean = false;
  interimResults : string = "";

  StartStreaming(): void {

    if(this.liveStreaming){
      this.liveStreaming = !this.liveStreaming;
      this.interimResults = this.speechService.getResults();
    } 
    else {
      this.liveStreaming = !this.liveStreaming;
      this.interimResults = "";
    }

  }

}