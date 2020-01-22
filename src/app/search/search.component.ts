import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MediatorService} from '../services/mediator.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(
    public mediatorService: MediatorService
  ) {
  }

  form: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      search: new FormControl('', [
        Validators.required
      ])
    });
  }

  submit(): void {
    this.mediatorService.wikiSearch(this.form.value.search, true);
    this.form.reset();
  }

  styleSearch(): void {
    this.mediatorService.getPages().length > 0;
  }
}
