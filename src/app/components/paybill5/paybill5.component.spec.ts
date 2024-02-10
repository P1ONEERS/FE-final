import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Paybill5Component } from './paybill5.component';

describe('Paybill5Component', () => {
  let component: Paybill5Component;
  let fixture: ComponentFixture<Paybill5Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Paybill5Component]
    });
    fixture = TestBed.createComponent(Paybill5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
