import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CobacobaComponent } from './cobacoba.component';

describe('CobacobaComponent', () => {
  let component: CobacobaComponent;
  let fixture: ComponentFixture<CobacobaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CobacobaComponent]
    });
    fixture = TestBed.createComponent(CobacobaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
