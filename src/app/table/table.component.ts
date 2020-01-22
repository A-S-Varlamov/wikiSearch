import { Component, OnInit } from '@angular/core'
import {MediatorService} from '../services/mediator.service'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {

  constructor( public mediatorService: MediatorService ) { }

  getLink(item): string {
    return `https://ru.wikipedia.org/?curid=${item.pageid}`
  }

}
