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
    params = params.append('action', 'query')
      .append('format', 'json')
      .append('list', 'search')
      .append('srsort', querySort)
      .append('sroffset', searchOffset + '')
      .append('origin', '*')
      .append('srsearch', searchStr);
    return params;
  }


}
