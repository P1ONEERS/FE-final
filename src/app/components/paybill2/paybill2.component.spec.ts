import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Paybill2Component } from './paybill2.component';

describe('Paybill2Component', () => {
  let component: Paybill2Component;
  let fixture: ComponentFixture<Paybill2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Paybill2Component]
    });
    fixture = TestBed.createComponent(Paybill2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
