import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VisualService {

  constructor() {
    this.setTheme(this.activeTheme);
  }

  private searchFixed = false;
  private allThemes = ['черно-белая', 'космос', 'апельсин', 'своя'];
  public activeTheme = 'апельсин';
  public themeHue = 75;

  setTheme(theme: string) {
    switch (theme) {
      case 'черно-белая': {
        document.documentElement.setAttribute('theme', 'dark');
        this.activeTheme = 'черно-белая';
        break;
      }
      case 'космос': {
        document.documentElement.setAttribute('theme', 'space');
        this.activeTheme = 'космос';
        break;
      }
      case 'апельсин': {
        document.documentElement.setAttribute('theme', 'orange');
        this.activeTheme = 'апельсин';
        break;
      }
      case 'своя': {
        document.documentElement.setAttribute('theme', 'myself');
        this.activeTheme = 'своя';
        break;
      }
    }
  }

  getThemes() {
    return this.allThemes;
  }

  getSearchFixed(): boolean {
    return this.searchFixed;
  }

  inputUp(): void {
    this.searchFixed = true;
  }

  inputDown(): void {
    this.searchFixed = false;
  }
}
