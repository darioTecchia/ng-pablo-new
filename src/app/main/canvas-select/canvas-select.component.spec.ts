import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasSelectComponent } from './canvas-select.component';

describe('CanvasSelectComponent', () => {
  let component: CanvasSelectComponent;
  let fixture: ComponentFixture<CanvasSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
