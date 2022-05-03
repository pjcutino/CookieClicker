import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeMakerComponent } from './coffee-maker.component';

describe('CoffeeMakerComponent', () => {
  let component: CoffeeMakerComponent;
  let fixture: ComponentFixture<CoffeeMakerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoffeeMakerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffeeMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
