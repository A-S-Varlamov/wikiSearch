import { TestBed } from '@angular/core/testing';

import { VisualService } from './visual.service';

describe('VisualService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VisualService = TestBed.get(VisualService);
    expect(service).toBeTruthy();
  });

  it('применение темы к документу', () => {
    const service: VisualService = TestBed.get(VisualService);
    service.setTheme('апельсин');
    const result = document.documentElement.getAttribute('theme');
    expect(result).toBe('orange');
  });
});
