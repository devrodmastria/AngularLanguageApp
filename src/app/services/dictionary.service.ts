import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DictionaryModel } from '../Models/dictionary-model';
import { secretkey } from '../secret';
import { FavoriteWord } from '../Models/favorite-words';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  allFavorites:FavoriteWord[] = [
    {
      userId: "googleId1234",
      word: "programming",
      definition: "the art of creating digital goods",
      source: "made up by us",
      phonetics: "ˈprō-ˌgra-miŋ",
      context: "add context about this word...",
      audioSource: "no audio available",
      id: 999
    },
    {
      userId: "googleId1235",
      word: "interpolation",
      definition: "the art of creating fancy strings",
      source: "made up by us",
      phonetics: "in-ˌtər-pə-ˈlā-shən",
      context: "add context about this word...",
      audioSource: "no audio available",
      id: 1000
    },

  ]

  constructor(private http: HttpClient) { }
  getDefinition(word: string):Observable<DictionaryModel[]> {
    return this.http.get<DictionaryModel[]> (`https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${secretkey}`)
  }
}
