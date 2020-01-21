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

  addEventScroll() {
    window.addEventListener('scroll', () => {
      const pageEnd = Helper.ifPageEnd(Helper.queryContinue);
      if (pageEnd) {
        this.wikiSearch(Helper.searchStr, false);
      }
    });
  }

  loadRequests() {
    const req = this.localStorage.getFromStorage('requests');
    if (req !== null) {
      Helper.oldrequests = JSON.parse(req);
    }
  }

  loadRequestsTime() {
    const time = this.localStorage.getFromStorage('requestsTime');
    if (time !== null) {
      Helper.oldrequestsTime = JSON.parse(time);
    }
  }

  loadActiveTheme() {
    const theme = this.localStorage.getFromStorage('activeTheme');
    if (theme !== null) {
      this.visualService.activeTheme = theme;
      this.visualService.setTheme(theme);
    }
  }

  loadHue() {
    const hue = this.localStorage.getFromStorage('hue');
    if (hue !== null) {
      this.visualService.themeHue = +hue;
      document.documentElement.style.setProperty('--main-hue', hue);
    }
  }

  wikiSearch(queryStr: string, newQuery: boolean): void {
    Helper.searchStr = queryStr;
    this.visualService.inputUp();
    if (!this.loaderToggle) {
      this.loaderToggle = !this.loaderToggle;
      let time = performance.now();

      this.queryService.wikiSearch(Helper.searchStr, Helper.searchOffset, Helper.querySort)
        .subscribe(response => {
          time = performance.now() - time;
          if (newQuery) {
            Helper.searchOffset = 0;
            this.localStorage.newRequest(queryStr, Helper.oldrequests, time, Helper.oldrequestsTime);
            document.documentElement.scrollTop = 0;
          }
          if (response['error']) {
            Helper.resultText = response['error'].info;
          }
          this.loaderToggle = !this.loaderToggle;
          Helper.queryDone(response, newQuery);
          this.ifNotResult(Helper.pages);

        }, error => {
          console.log(error);
          Helper.resultText = error.message;
        });
    }
  }

  setSorting(str) {
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

