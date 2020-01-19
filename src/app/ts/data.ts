export abstract class Helper {

  protected static searchStr = '';
  protected static querySort = 'relevance';
  protected static pages = [];
  protected static resultText = '';
  protected static searchOffset = 0;
  protected static queryContinue = true;
  protected static sortText = {
                          relevance: 'по релевантности',
                          last_edit_desc: 'по дате изменения ↓',
                          last_edit_asc: 'по дате изменения ↑',
                          create_timestamp_desc: 'по дате создания ↓',
                          create_timestamp_asc: 'по дате создания ↑',
                          random: 'случайно'
                        };

  private static ifNewQuery(response: object, newQuery: boolean, ): any[] {
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
      this.searchOffset = response['continue'].sroffset
      this.queryContinue = true
    } else {
      this.queryContinue = false
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
    pages = this.ifNewQuery(response, newQuery)
    this.ifQueryContinue(response)
    pages = this.clearSnippet(pages);
    this.pages = pages
  }

  protected static setSorting(str) {
    if (str !== this.querySort)
    {
      this.querySort = str
      if (this.searchStr) {
        return true
      } else return false
    }
  }

  protected static ifPageEnd(queryContinue: boolean): boolean {
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const scrollTop = document.documentElement.scrollTop;
    const height = scrollHeight - scrollTop;
    if (height === clientHeight && queryContinue) {
      return true;
    } else {
      return false;
    }
  }


}
