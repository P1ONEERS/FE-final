import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Paybill1Component } from './paybill1.component';

describe('Paybill1Component', () => {
  let component: Paybill1Component;
  let fixture: ComponentFixture<Paybill1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Paybill1Component]
    });
    fixture = TestBed.createComponent(Paybill1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
