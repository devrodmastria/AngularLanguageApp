import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FavoriteWordsComponent } from './components/favorite-words/favorite-words.component';
import { LoginComponent } from './components/login/login.component';
import { AboutComponent } from './components/about/about.component';

export const routes: Routes = [
    {path: "", component: LoginComponent},
    {path: "login", component: LoginComponent},
    {path: "home", component: HomeComponent},
    {path: "fav", component: FavoriteWordsComponent},
    {path: "about", component: AboutComponent},
    {path: "**", redirectTo:"", pathMatch:"full"}
];
