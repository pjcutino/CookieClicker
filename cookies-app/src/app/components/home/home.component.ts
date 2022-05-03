import { Component } from '@angular/core';
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
  users : User[] = []

  constructor(private persistanceService: PersistanceService, private router : Router, private formBuilder: FormBuilder) {
      this.userForm = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(5)]]
      });

      // get instance of all users
      for (let [key, value] of Object.entries(localStorage)) {
        this.users.push(this.persistanceService.get(key));
    }
   }

   public onSubmit(): void {
    this.submitted = true;
    if (this.userForm.valid) {
      
      let userName = this.userForm.get('name')!.value;
      // user exists
      if(this.persistanceService.get(userName)){

      }else{
        let user = new User(userName);
        this.persistanceService.set(userName,user);
      }

      this.router.navigate(['/game',userName]);

      this.userForm.reset();
      this.submitted = false;
    }
  }

}