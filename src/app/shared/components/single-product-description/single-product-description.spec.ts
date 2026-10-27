import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SingleProductDescription } from './single-product-description';

describe('SingleProductDescription', () => {
  let component: SingleProductDescription;
  let fixture: ComponentFixture<SingleProductDescription>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleProductDescription],
    }).compileComponents();

    fixture = TestBed.createComponent(SingleProductDescription);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
