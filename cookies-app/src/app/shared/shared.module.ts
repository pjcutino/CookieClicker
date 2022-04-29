import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PersistanceService } from './services/localstorage.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: []
})
export class SharedModule {
  static forRoot(){
    return{
      ngModule: SharedModule,
      providers:[PersistanceService]
    }
  }
 }
