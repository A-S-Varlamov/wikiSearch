import {Data} from './data';

export abstract class Helper extends Data {

  private static ifNewQuery(response: object, newQuery: boolean): any[] {
    let returnPages = [];
    if (newQuery) {
      returnPages = response['query'].search;
    } else {
      returnPages = this.pages.concat(response['query'].search);
    }
    return returnPages;
  }

  private static ifQueryContinue(response: object): void {
    if (response['continue']) {
      this.searchOffset = response['continue'].sroffset;
      this.queryContinue = true;
    } else {
      this.queryContinue = false;
    }
  }

  private static clearSnippet(pages: any[]): any[] {
    pages.forEach((item) => {
      item.snippet = item.snippet.replace(/<\/?[^>]+>/g, '');
    });
    return pages;
  }

  protected static queryDone(response, newQuery) {
    let pages = [];
    pages = this.ifNewQuery(response, newQuery);
    this.ifQueryContinue(response);
    pages = this.clearSnippet(pages);
    this.pages = pages;
  }

  protected static setSorting(str) {
    if (str !== this.querySort) {
      this.querySort = str;
      if (this.searchStr) {
        return true;
      } else {
        return false;
      }
    }
  }

  protected static ifPageEnd(queryContinue: boolean): boolean {
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const scrollTop = document.documentElement.scrollTop;
    const height = scrollHeight - scrollTop;
    if (Math.round(height) === clientHeight && queryContinue) {
      return true;
    } else {
      return false;
    }
  }
}
