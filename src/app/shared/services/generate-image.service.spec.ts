import { TestBed } from '@angular/core/testing';

import { GenerateImageService } from './generate-image.service';

describe('GenerateImageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GenerateImageService = TestBed.get(GenerateImageService);
    expect(service).toBeTruthy();
  });
});
