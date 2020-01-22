import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MenuComponent} from './menu.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [MenuComponent],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    });
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('присвоение переменной цвета значение слайдера', () => {
    const obj = {target: {value: '123'}};
    component.changeColorSlider(obj);
    expect(document.documentElement.style.cssText).toBe('--main-hue:123;');
  });

  it('сохранение в локальном хранилище значения цвета темы', () => {
    const obj = {target: {value: '123'}};
    component.changeColorSlider(obj);
    const result = localStorage.getItem('hue');
    expect(result).toBe('123');
  });
});
