import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// const process = require('process');
// import dotenv from 'dotenv'
// dotenv.config()

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
