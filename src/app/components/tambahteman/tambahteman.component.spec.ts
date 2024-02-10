import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TambahtemanComponent } from './tambahteman.component';

describe('TambahtemanComponent', () => {
  let component: TambahtemanComponent;
  let fixture: ComponentFixture<TambahtemanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TambahtemanComponent]
    });
    fixture = TestBed.createComponent(TambahtemanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
