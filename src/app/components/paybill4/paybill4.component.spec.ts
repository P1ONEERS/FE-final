import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Paybill4Component } from './paybill4.component';

describe('Paybill4Component', () => {
  let component: Paybill4Component;
  let fixture: ComponentFixture<Paybill4Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Paybill4Component]
    });
    fixture = TestBed.createComponent(Paybill4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
