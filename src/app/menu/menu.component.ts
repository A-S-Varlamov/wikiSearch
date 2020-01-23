import {Component} from '@angular/core';
import {MediatorService} from '../services/mediator.service'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']

})
export class MenuComponent {

  constructor(public mediatorService: MediatorService) {
  }

  changeColorSlider(event): void {
    const value = event.target['value'];
    document.documentElement.style.setProperty('--main-hue', value);
    this.mediatorService.saveToStorage('hue', value)
  }

  setSort(str: string): void {
    this.mediatorService.setSorting(str)
  }

}

