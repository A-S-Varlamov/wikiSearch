import {Injectable} from '@angular/core';
import {VisualService} from './visual.service';
import {QueryService} from './query.service';
import {LocalStorageService} from './local-storage.service';
import {Helper} from '../ts/helper';

@Injectable({
  providedIn: 'root'
})
export class MediatorService extends Helper {

  constructor(
    private visualService: VisualService,
    private queryService: QueryService,
    private localStorage: LocalStorageService
  ) {
    super();
    this.addEventScroll();
    this.loadRequests();
    this.loadRequestsTime();
    this.loadActiveTheme();
    this.loadHue();
  }

  loaderToggle = false;

  wikiSearch(queryStr: string, newQuery: boolean): void {
    Helper.searchStr = queryStr;
    this.visualService.inputUp();
    if (!this.loaderToggle) {
      this.loaderToggle = !this.loaderToggle;
      let time = performance.now();

      this.queryService.wikiSearch(Helper.searchStr, Helper.searchOffset, Helper.querySort)
        .subscribe(response => {
          time = performance.now() - time;
          this.ifNewQuery(queryStr, newQuery, time);
          this.ifResponseError(response);
          this.helperQueryDone(response, newQuery);

        }, error => {
          console.log(error);
          Helper.resultText = error.message;
        });
    }
  }

  ifNewQuery(queryStr, newQuery, time): void {
    if (newQuery) {
      Helper.searchOffset = 0;
      this.localStorage.newRequest(queryStr, Helper.oldrequests, time, Helper.oldrequestsTime);
      document.documentElement.scrollTop = 0;
    }
  }

  ifResponseError(response): void {
    if (response['error']) {
      Helper.resultText = response['error'].info;
    }
  }

  helperQueryDone(response, newQuery): void {
    Helper.queryDone(response, newQuery);
    this.loaderToggle = !this.loaderToggle;
    this.ifNotResult(Helper.pages);
  }


  addEventScroll(): void {
    window.addEventListener('scroll', () => {
      const pageEnd = Helper.ifPageEnd(Helper.queryContinue);
      if (pageEnd && Helper.searchStr) {
        this.wikiSearch(Helper.searchStr, false);
      }
    });
  }

  loadRequests(): void {
    const req = this.localStorage.getFromStorage('requests');
    if (req !== null) {
      Helper.oldrequests = JSON.parse(req);
    }
  }

  loadRequestsTime(): void {
    const time = this.localStorage.getFromStorage('requestsTime');
    if (time !== null) {
      Helper.oldrequestsTime = JSON.parse(time);
    }
  }

  loadActiveTheme(): void {
    const theme = this.localStorage.getFromStorage('activeTheme');
    if (theme !== null) {
      this.visualService.activeTheme = theme;
      this.visualService.setTheme(theme);
    }
  }

  loadHue(): void {
    const hue = this.localStorage.getFromStorage('hue');
    if (hue !== null) {
      this.visualService.themeHue = +hue;
      document.documentElement.style.setProperty('--main-hue', hue);
    }
  }

  setSorting(str: string): void {
    if (Helper.setSorting(str)) {
      this.wikiSearch(Helper.searchStr, true);
    }
  }

  ifNotResult(pages: any[]): void {
    if (pages.length === 0) {
      this.visualService.inputDown();
      Helper.resultText = 'Нет результатов...';
    }
  }

  getSearchFixed(): boolean {
    return this.visualService.getSearchFixed();
  }

  getThemes() {
    return this.visualService.getThemes();
  }

  getActiveTheme(): string {
    return this.visualService.activeTheme;
  }

  setTheme(theme: string) {
    this.visualService.setTheme(theme);
    this.localStorage.saveToStorage('activeTheme', theme);
  }

  saveToStorage(key: string, value: string) {
    this.localStorage.saveToStorage(key, value);
  }


  getOldRequests() {
    return Helper.oldrequests;
  }

  getOldRequestsTime() {
    return Helper.oldrequestsTime;
  }

  getPages(): any[] {
    return Helper.pages;
  }

  getSortText() {
    return Helper.sortText;
  }

  getQuerySort() {
    return Helper.querySort;
  }

  getResultText() {
    return Helper.resultText;
  }

}

