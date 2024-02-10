import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummarybillComponent } from './summarybill.component';

describe('SummarybillComponent', () => {
  let component: SummarybillComponent;
  let fixture: ComponentFixture<SummarybillComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SummarybillComponent]
    });
    fixture = TestBed.createComponent(SummarybillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
