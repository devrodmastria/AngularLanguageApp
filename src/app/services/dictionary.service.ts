(window as any).process = {
  env: { DEBUG: undefined },
};

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DictionaryModel } from '../Models/dictionary-model';
import { FavoriteWord } from '../Models/favorite-words';
import { environment } from '../../environments/environment';

const secret_key = environment.dictionaryAPI

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

  localDefinitions: FavoriteWord[] =[];

  constructor(private http: HttpClient) { }

  hasDefinition(word: string): boolean  {
    let localDefinition = this.localDefinitions.find(item => item.word == word)

    if(localDefinition != undefined){
      return true;
    }
    return false;
  }

  parseAudioUrl(fileCode: string, subDir: string): string {


          // audio guidelines - https://dictionaryapi.com/products/json
          // "https://media.merriam-webster.com/audio/prons/[language_code]/[country_code]/[format]/[subdirectory]/[base filename].[format]"

          /*
            if audio begins with "bix", the subdirectory should be "bix",
            if audio begins with "gg", the subdirectory should be "gg",
            if audio begins with a number or punctuation (eg, "_"), the subdirectory should be "number",
            otherwise, the subdirectory is equal to the first letter of audio.
          */

            switch ( subDir ) {
              case 'bix':
                  // statement 1
                  subDir = 'bix'
                  break;
              case 'gg':
                  subDir = 'gg'
                  break;
              case '0':
                case '1':
                  case '2':
                    case '3':
                      case '4':
                        case '5':
                          case '6':
                            case '7':
                              case '8':
                                case '9':
                                  case '_':
                                    subDir = 'number'
                                    break;
              default: 
                subDir = subDir.substring(0,1);
                  break;
          }

    let fullUrl = `https://media.merriam-webster.com/audio/prons/en/us/mp3/${subDir}/${fileCode}.mp3`

    return fullUrl;
  }

  getDefinition(word: string):Observable<DictionaryModel[]> {
    return this.http.get<DictionaryModel[]> (`https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${secret_key}`)
  }
}
