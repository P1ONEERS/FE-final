import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PilihitemComponent } from './pilihitem.component';

describe('PilihitemComponent', () => {
  let component: PilihitemComponent;
  let fixture: ComponentFixture<PilihitemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PilihitemComponent]
    });
    fixture = TestBed.createComponent(PilihitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
