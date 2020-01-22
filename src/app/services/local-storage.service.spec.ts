import {TestBed} from '@angular/core/testing';

import {LocalStorageService} from './local-storage.service';

describe('LocalStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocalStorageService = TestBed.get(LocalStorageService);
    expect(service).toBeTruthy();
  });

  it('сохранение в local storage', () => {
    const service: LocalStorageService = TestBed.get(LocalStorageService);
    service.saveToStorage('key', 'value');
    const result = localStorage.getItem('key');
    expect(result).toBe('value');
  });

  it('если новый запрос, то добавляется в начало массива и сохраняется в local storage', () => {
    const service: LocalStorageService = TestBed.get(LocalStorageService);
    localStorage.clear();
    service.newRequest('дом', ['мяч', 'лес'], 100, ['11', '22']);
    const arr = ['дом', 'мяч', 'лес'];
    let result = localStorage.getItem('requests');
    result = JSON.parse(result);
    expect(result).toEqual(arr);
  });

  it('если запрос уже есть (проверка private queryNotExists)', () => {
    const service: LocalStorageService = TestBed.get(LocalStorageService);
    localStorage.clear();
    service.newRequest('лес', ['мяч', 'лес'], 100, ['11', '22']);
    const result = localStorage.getItem('requests');
    expect(result).toBe(null);
  });

  it('если история запросов ровна 7, то новый запрос добавляется в начало, а последний убирается',
    () => {
    const service: LocalStorageService = TestBed.get(LocalStorageService);
    localStorage.clear();
    service.newRequest('дом', ['мяч', 'лес', 'конь', 'шар', 'нос', 'пень', 'лень'],
      100, ['11', '22']);
    let result = localStorage.getItem('requests');
    result = JSON.parse(result);
    expect(result).toEqual(['дом', 'мяч', 'лес', 'конь', 'шар', 'нос', 'пень']);
  });

  it('проверка добавления времени запроса',
    () => {
      const service: LocalStorageService = TestBed.get(LocalStorageService);
      localStorage.clear();
      service.newRequest('дом', ['мяч', 'лес', 'конь', 'шар', 'нос', 'пень', 'лень'],
        100, ['11', '22', '33', '44', '55', '66', '77']);
      let result = localStorage.getItem('requestsTime');
      result = JSON.parse(result);
      expect(result).toEqual(['100', '11', '22', '33', '44', '55', '66']);
    });
});
