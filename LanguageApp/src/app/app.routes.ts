import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FavoriteWordsComponent } from './components/favorite-words/favorite-words.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    {path: "", component: LoginComponent},
    {path: "home", component: HomeComponent},
    {path: "fav", component: FavoriteWordsComponent},
    {path: "**", redirectTo:"", pathMatch:"full"}
];
