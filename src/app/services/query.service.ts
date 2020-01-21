import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  constructor( private http: HttpClient ) { }

  wikiSearch(searchStr: string, searchOffset: number, querySort: string): Observable<Object> {
    const params = this.getQueryParams(searchStr, searchOffset, querySort)
    return this.http.get(`https://ru.wikipedia.org/w/api.php`, {params})
  }

  getQueryParams(searchStr: string, searchOffset: number, querySort: string) {
    let params = new HttpParams();
    params = params.append('action', 'query');
    params = params.append('format', 'json');
    params = params.append('list', 'search');
    params = params.append('srsort', querySort);
    params = params.append('sroffset', searchOffset + '');
    params = params.append('origin', '*');
    params = params.append('srsearch', searchStr);
    return params;
  }


}
