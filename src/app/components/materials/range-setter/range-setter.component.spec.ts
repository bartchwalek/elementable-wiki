import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeSetterComponent } from './range-setter.component';

describe('RangeSetterComponent', () => {
  let component: RangeSetterComponent;
  let fixture: ComponentFixture<RangeSetterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RangeSetterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RangeSetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
