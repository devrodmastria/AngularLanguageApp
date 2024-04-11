import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { FavoriteWord } from '../Models/favorite-words';

@Injectable({
  providedIn: 'root'
})

export class ConfigEnvService {

  baseUrl: string = environment.dbDomain + "/api"

  private subID = ""
  private group = ""
  private app = ""
  private apiURL = `https://management.azure.com/subscriptions/${this.subID}/resourceGroups/${this.group}/providers/Microsoft.Web/sites/${this.app}/config/appsettings?api-version=2021-02-01`;

  constructor(private httpClient : HttpClient) { }

  // access environment variables from Azure - requires paid subscription
  getAzureEnvironmentVariables(): Observable<any> {
    return this.httpClient.get<any>(this.apiURL);
  }

  getLoginInfoById (id: string): Observable <FavoriteWord[]> {
    return this.httpClient.get<FavoriteWord[]> (`${this.baseUrl}/Favorite/${id}`)
  }

  getFavorites():Observable<FavoriteWord[]>{
    return this.httpClient.get<FavoriteWord[]>(this.baseUrl);
  }

}
