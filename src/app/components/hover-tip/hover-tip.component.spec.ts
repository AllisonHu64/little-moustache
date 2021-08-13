import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoverTipComponent } from './hover-tip.component';

describe('HoverTipComponent', () => {
  let component: HoverTipComponent;
  let fixture: ComponentFixture<HoverTipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HoverTipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HoverTipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
