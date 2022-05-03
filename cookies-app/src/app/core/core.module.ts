import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { StorageService } from '../shared/services/localstorage.service';

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[HeaderComponent, FooterComponent],
  providers:[StorageService, { provide: 'Window', useValue: typeof window !== 'undefined' && window }]
})
export class CoreModule { }
