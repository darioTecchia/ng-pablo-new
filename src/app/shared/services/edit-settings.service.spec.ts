import { TestBed } from '@angular/core/testing';

import { EditSettingsService } from './edit-settings.service';

describe('EditSettingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditSettingsService = TestBed.get(EditSettingsService);
    expect(service).toBeTruthy();
  });
});
