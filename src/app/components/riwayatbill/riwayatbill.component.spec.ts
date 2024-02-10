import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiwayatbillComponent } from './riwayatbill.component';

describe('RiwayatbillComponent', () => {
  let component: RiwayatbillComponent;
  let fixture: ComponentFixture<RiwayatbillComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RiwayatbillComponent]
    });
    fixture = TestBed.createComponent(RiwayatbillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
