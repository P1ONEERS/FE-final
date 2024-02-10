import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjustqtyComponent } from './adjustqty.component';

describe('AdjustqtyComponent', () => {
  let component: AdjustqtyComponent;
  let fixture: ComponentFixture<AdjustqtyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdjustqtyComponent]
    });
    fixture = TestBed.createComponent(AdjustqtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
