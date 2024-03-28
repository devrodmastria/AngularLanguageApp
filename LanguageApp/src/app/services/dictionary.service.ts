import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DictionaryModel } from '../Models/dictionary-model';
import { secretkey } from '../secret';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  constructor(private http: HttpClient) { }
  getDefinition(word: string):Observable<DictionaryModel> {
    return this.http.get<DictionaryModel> (`https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${secretkey}`)
  }
}
