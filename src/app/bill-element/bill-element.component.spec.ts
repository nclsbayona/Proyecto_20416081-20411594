import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillElementComponent } from './bill-element.component';

describe('BillElementComponent', () => {
  let component: BillElementComponent;
  let fixture: ComponentFixture<BillElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
