import {Injectable, OnInit} from '@angular/core';
import {VisualService} from './visual.service';
import {QueryService} from './query.service';
import {Helper} from '../ts/helper';

@Injectable({
  providedIn: 'root'
})
export class DataService extends Helper{

  constructor(
              private visualService: VisualService,
              private queryService: QueryService
  ) { super() }

    eventScroll = window.addEventListener('scroll', () => {
    this.ifPageEnd();
  });

  wikiSearch(queryStr: string, newQuery: boolean): void {
    Helper.searchStr = queryStr;
    this.visualService.inputUp();
    if (newQuery) Helper.searchOffset = 0;

    this.queryService.wikiSearch( Helper.searchStr, Helper.searchOffset, Helper.querySort )
      .subscribe(response => {
        Helper.queryDone(response, newQuery)
        this.ifNotResult(Helper.pages)
      }, error => {
        console.log(error);
      });
  }

  setSorting(str) {
    if (Helper.setSorting(str))
        this.wikiSearch( Helper.searchStr, true)
  }

  ifNotResult(pages: any[]): void {
    if (pages.length === 0) {
      this.visualService.inputDown();
      Helper.resultText = 'Нет результатов...';
    }
  }

  ifPageEnd(): void {
    const pageEnd = Helper.ifPageEnd(Helper.queryContinue)
    if (pageEnd) {
      this.wikiSearch(Helper.searchStr, false);
    }
  }

  getSearchFixed(): boolean{
    return this.visualService.getSearchFixed();
  }

  getPages(): any[] {
    return Helper.pages;
  }

  getSortText() {
    return Helper.sortText
  }

  getQuerySort() {
    return Helper.querySort
  }

  getResultText() {
    return Helper.resultText
  }

}

