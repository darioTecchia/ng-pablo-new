import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SizesSelectComponent } from './sizes-select.component';

describe('SizesSelectComponent', () => {
  let component: SizesSelectComponent;
  let fixture: ComponentFixture<SizesSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SizesSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SizesSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
