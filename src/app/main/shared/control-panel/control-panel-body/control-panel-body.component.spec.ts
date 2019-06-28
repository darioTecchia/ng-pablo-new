import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPanelBodyComponent } from './control-panel-body.component';

describe('ControlPanelBodyComponent', () => {
  let component: ControlPanelBodyComponent;
  let fixture: ComponentFixture<ControlPanelBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlPanelBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlPanelBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
