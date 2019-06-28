import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayLogoComponent } from './overlay-logo.component';

describe('OverlayLogoComponent', () => {
  let component: OverlayLogoComponent;
  let fixture: ComponentFixture<OverlayLogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverlayLogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverlayLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
