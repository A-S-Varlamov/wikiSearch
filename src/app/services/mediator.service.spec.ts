import {TestBed} from '@angular/core/testing';
import {MediatorService} from './mediator.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('MediatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: MediatorService = TestBed.get(MediatorService);
    expect(service).toBeTruthy();
  });

  it('проверка метода setTheme', () => {
    const service: MediatorService = TestBed.get(MediatorService);
    service.setTheme('апельсин');
    const result = document.documentElement.getAttribute('theme');
    expect(result).toBe('orange');
  });

  it('проверка метода getActiveTheme', () => {
    const service: MediatorService = TestBed.get(MediatorService);
    const result = service.getActiveTheme();
    expect(result).toBe('апельсин');
  });

  it('проверка метода loadHue', () => {
    const service: MediatorService = TestBed.get(MediatorService);
    localStorage.setItem('hue', '321');
    service.loadHue();
    expect(document.documentElement.style.cssText).toBe('--main-hue:321;');
  });

  it('проверка метода loadActiveTheme', () => {
    const service: MediatorService = TestBed.get(MediatorService);
    localStorage.setItem('activeTheme', 'космос');
    service.loadActiveTheme();
    const result = document.documentElement.getAttribute('theme');
    expect(result).toBe('space');
  });
});
