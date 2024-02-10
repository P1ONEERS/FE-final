import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryplnComponent } from './summarypln.component';

describe('SummaryplnComponent', () => {
  let component: SummaryplnComponent;
  let fixture: ComponentFixture<SummaryplnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SummaryplnComponent]
    });
    fixture = TestBed.createComponent(SummaryplnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
