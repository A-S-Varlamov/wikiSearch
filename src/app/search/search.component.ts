import { Component, OnInit } from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { MediatorService } from '../services/mediator.service'
//import {state, style, trigger, transition, animate} from '@angular/animations'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
  // animations: [
  //   trigger('search', [
  //     state('top', style({position: 'inherit'})),
  //     state('fixed', style({position: 'fixed'})),
  //     transition('top <=> fixed', animate(1000))
  //   ])
  // ]
})
export class SearchComponent implements OnInit {

  constructor(
    private mediatorService: MediatorService
  ) { }

  form: FormGroup

  ngOnInit() {
    this.form = new FormGroup({
      search: new FormControl('', [
        Validators.required
      ])
    })
  }

  submit(): void {
    this.mediatorService.wikiSearch(this.form.value.search, true)
    this.form.reset();
  }

  styleSearch(): void {
    this.mediatorService.getPages().length > 0
  }
}
