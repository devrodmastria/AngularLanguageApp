import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigEnvService {
  private apiURL = '';

  constructor(private httpClient : HttpClient) { }

  getAzureEnvironmentVariables(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiURL}/azure-env-vars`);
  }
}
