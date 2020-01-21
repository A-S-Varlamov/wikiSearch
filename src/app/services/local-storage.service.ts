import {Injectable} from '@angular/core';
import {Helper} from '../ts/helper';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {
  }

  saveToStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  private queryNotExists(queryStr: string, oldrequests: string[]): boolean {
    if (oldrequests) {
      if (oldrequests.find(item => item === queryStr)) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  newRequest(queryStr: string, oldrequests: string[], time: number, oldrequestsTime: string[]) {
    const notExist = this.queryNotExists(queryStr, oldrequests);
    if (notExist) {
      if (oldrequests.length > 6) {
        oldrequests.pop();
        oldrequestsTime.pop();
      }
      oldrequests.unshift(queryStr);
      oldrequestsTime.unshift(time + '');
      const value = JSON.stringify(oldrequests);
      const valueTime = JSON.stringify(oldrequestsTime);
      this.saveToStorage('requests', value);
      this.saveToStorage('requestsTime', valueTime);
    }
  }

  getFromStorage(key: string): string {
    return localStorage.getItem(key)
  }


}
