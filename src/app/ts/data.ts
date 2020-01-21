export abstract class Data {

  protected static searchStr = '';
  protected static pages = [];
  protected static oldrequests = [];
  protected static oldrequestsTime = [];
  protected static resultText = '';
  protected static searchOffset = 0;
  protected static queryContinue = true;
  protected static querySort = 'relevance';
  protected static sortText = {
                          relevance: 'по релевантности',
                          last_edit_desc: 'по дате изменения ↓',
                          last_edit_asc: 'по дате изменения ↑',
                          create_timestamp_desc: 'по дате создания ↓',
                          create_timestamp_asc: 'по дате создания ↑',
                          random: 'случайно'
                        };

}
