import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HasilscanComponent } from './hasilscan.component';

describe('HasilscanComponent', () => {
  let component: HasilscanComponent;
  let fixture: ComponentFixture<HasilscanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HasilscanComponent]
    });
    fixture = TestBed.createComponent(HasilscanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
