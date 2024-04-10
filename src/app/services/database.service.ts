(window as any).process = {
  env: { DEBUG: undefined },
};

import { HttpClient } from '@angular/common/http';
// import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { FavoriteWord } from '../Models/favorite-words';
import { UserTable } from '../Models/user-table';
import { Injectable, Type } from '@angular/core';

// const environment = import.meta.resolve("apiDomain").valueOf();
//const environment = import.meta.resolve("apiDomain", "NODE_ENV").valueOf()
const environment = process.env.apiDomain; // DATABASE_DOMAIN

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http:HttpClient) { }

  // baseUrl: string = environment.apiDomain + "/api"
  baseUrl: string = environment + "/api" 
  
  getFavorites():Observable<FavoriteWord[]>{
    return this.http.get<FavoriteWord[]>(this.baseUrl);
  }

  getFavoritesbyId (id: string): Observable <FavoriteWord[]> {
    return this.http.get<FavoriteWord[]> (`${this.baseUrl}/Favorite/${id}`)
  }

  addFavorites(f:FavoriteWord):Observable<FavoriteWord>{
    return this.http.post<FavoriteWord>(`${this.baseUrl}/Favorite`, f)
  }

  DeleteFavorites(f: FavoriteWord):Observable <FavoriteWord> {
    return this.http.delete<FavoriteWord> (`${this.baseUrl}/Favorite/${f.id}`)
  }
  UpdateFavorites (f:FavoriteWord): Observable <FavoriteWord> {
    return this.http.put<FavoriteWord> (`${this.baseUrl}/Favorite/${f.id}`, f)
  }
  getUserbyId(id:string): Observable <UserTable[]> {
    return this.http.get<UserTable[]> (`${this.baseUrl}/Users/${id}`)
  }
  AddUser (u: UserTable): Observable <UserTable> {
    return this.http.post<UserTable> (`${this.baseUrl}/Users`, u)
  }
}
