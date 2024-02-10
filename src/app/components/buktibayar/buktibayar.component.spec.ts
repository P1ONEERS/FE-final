import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuktibayarComponent } from './buktibayar.component';

describe('BuktibayarComponent', () => {
  let component: BuktibayarComponent;
  let fixture: ComponentFixture<BuktibayarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuktibayarComponent]
    });
    fixture = TestBed.createComponent(BuktibayarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
