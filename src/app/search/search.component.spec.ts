import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {By} from '@angular/platform-browser';
import {NgForm} from '@angular/forms';


describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ SearchComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    });

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('проверка добавления класса center для input', () => {
    fixture.detectChanges()

    const debEl = fixture.debugElement.query(By.css('.content'));
    const el: HTMLElement = debEl.nativeElement;
    expect(el.classList.contains('center')).toBeTruthy();
  })

  it('проверка добавления стиля margin: 10vh auto', () => {
    fixture.detectChanges()
    const debEl = fixture.debugElement.query(By.css('.wikiIcon'));
    const el: HTMLElement = debEl.nativeElement;
    expect(el.style.margin).toContain('10vh auto')
  })

});

