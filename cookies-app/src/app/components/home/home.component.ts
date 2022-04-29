import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PersistanceService } from 'src/app/shared/services/localstorage.service';
import { User } from 'src/app/shared/services/models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  public userForm: FormGroup;
  public submitted: boolean = false;

  constructor(private router : Router, private formBuilder: FormBuilder, private persistanceService: PersistanceService) {
      this.userForm = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(5)]]
      });
   }

   public onSubmit(): void {
    this.submitted = true;
    if (this.userForm.valid) {
      
      let userName = this.userForm.get('name')!.value;
      // user exists
      if(this.persistanceService.get(userName)){

      }else{
        let user = new User(userName);
        this.persistanceService.set(userName,JSON.stringify(user));
        console.log(this.persistanceService.get(userName));
      }

      this.router.navigate(['/game']);

      this.userForm.reset();
      this.submitted = false;
    }
  }
}