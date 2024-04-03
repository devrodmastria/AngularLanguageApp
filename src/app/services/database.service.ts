import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { FavoriteWord } from '../Models/favorite-words';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http:HttpClient) { }

  baseUrl: string = environment.apiDomain + "/api/Users"
  
  getFavorites():Observable<FavoriteWord[]>{
    return this.http.get<FavoriteWord[]>(this.baseUrl);
  }

  addFavorites(f:FavoriteWord):Observable<FavoriteWord>{
    return this.http.post<FavoriteWord>(`${this.baseUrl}/FavoriteWords`, f)
  }
}
