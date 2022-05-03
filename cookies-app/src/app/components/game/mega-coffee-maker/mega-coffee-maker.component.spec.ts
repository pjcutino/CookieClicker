import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MegaCoffeeMakerComponent } from './mega-coffee-maker.component';

describe('MegaCoffeeMakerComponent', () => {
  let component: MegaCoffeeMakerComponent;
  let fixture: ComponentFixture<MegaCoffeeMakerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MegaCoffeeMakerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MegaCoffeeMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
