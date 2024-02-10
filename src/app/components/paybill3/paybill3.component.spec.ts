import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Paybill3Component } from './paybill3.component';

describe('Paybill3Component', () => {
  let component: Paybill3Component;
  let fixture: ComponentFixture<Paybill3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Paybill3Component]
    });
    fixture = TestBed.createComponent(Paybill3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
