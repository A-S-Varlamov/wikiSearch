import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ TableComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('создание ссылки на wikipedia.org', () => {
    const item = {pageid: '12345'};
    const result = component.getLink(item);
    expect(result).toBe('https://ru.wikipedia.org/?curid=12345');
  });
});
