import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FavoriteWordsComponent } from './components/favorite-words/favorite-words.component';

export const routes: Routes = [
    {path: "", component: HomeComponent},
    {path: "fav", component: FavoriteWordsComponent},
    {path: "**", redirectTo:"", pathMatch:"full"}
];
