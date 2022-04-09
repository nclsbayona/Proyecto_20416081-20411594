import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartElementComponent } from './cart-element.component';

describe('CartElementComponent', () => {
  let component: CartElementComponent;
  let fixture: ComponentFixture<CartElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
