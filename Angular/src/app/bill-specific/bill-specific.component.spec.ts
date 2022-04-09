import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillSpecificComponent } from './bill-specific.component';

describe('BillSpecificComponent', () => {
  let component: BillSpecificComponent;
  let fixture: ComponentFixture<BillSpecificComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillSpecificComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillSpecificComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
