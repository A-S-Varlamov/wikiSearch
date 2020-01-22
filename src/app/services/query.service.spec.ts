import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

import {QueryService} from './query.service';
import {EMPTY} from 'rxjs';

describe('QueryService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: QueryService = TestBed.get(QueryService);
    expect(service).toBeTruthy();
  });

  it('создание параметров запроса', () => {
    const service: QueryService = TestBed.get(QueryService);
    const params = [
      {param: 'action', value: 'query', op: 'a'},
      {param: 'format', value: 'json', op: 'a'},
      {param: 'list', value: 'search', op: 'a'},
      {param: 'srsort', value: 'relevance', op: 'a'},
      {param: 'sroffset', value: '20', op: 'a'},
      {param: 'origin', value: '*', op: 'a'},
      {param: 'srsearch', value: 'Юпитер', op: 'a'}];
    const searchStr = 'Юпитер';
    const searchOffset = 20;
    const querySort = 'relevance';
    const result = service.getQueryParams(searchStr, searchOffset, querySort);
    expect(result['updates']).toEqual(params);
  });

  it('запрос ru.wikipedia.org методом GET', () => {
    const service: QueryService = TestBed.get(QueryService);
    const spy = spyOn(service, 'wikiSearch').and.callFake(() => {
      return EMPTY;
    });

    service.wikiSearch('Пушкин', 0, 'relevance');
    expect(spy).toHaveBeenCalled();

  });
});
