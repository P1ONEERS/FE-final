import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlnComponent } from './pln.component';

describe('PlnComponent', () => {
  let component: PlnComponent;
  let fixture: ComponentFixture<PlnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlnComponent]
    });
    fixture = TestBed.createComponent(PlnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
