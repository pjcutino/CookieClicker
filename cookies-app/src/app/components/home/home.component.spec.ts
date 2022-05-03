import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { StorageService } from 'src/app/shared/services/localstorage.service';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [RouterTestingModule ],
      providers: [StorageService, FormBuilder]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  })
  
  // minimun 5 characters validation
  it(`form should be invalid`, () =>{
    component.userForm.controls['name'].setValue('test');
    expect(component.userForm.valid).toBeFalsy();
  });
  it(`form should be valid`, () =>{
    component.userForm.controls['name'].setValue('testa');
    expect(component.userForm.valid).toBeTruthy();
  });

  it(`form should call the OnSubmit method`, () =>{
    fixture.detectChanges();
    spyOn(component, `onSubmit`);
    const el = fixture.debugElement.query(By.css(`button`)).nativeElement;
    el.click();
    expect(component.onSubmit).toHaveBeenCalledTimes(0);
  });
});
