import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoSelectComponent } from './logo-select.component';

describe('LogoSelectComponent', () => {
  let component: LogoSelectComponent;
  let fixture: ComponentFixture<LogoSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
