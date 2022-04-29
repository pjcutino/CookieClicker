import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    SharedModule.forRoot(),
    HomeRoutingModule,
    ReactiveFormsModule,
  ],
  exports:[HomeComponent]
})
export class HomeModule { }
