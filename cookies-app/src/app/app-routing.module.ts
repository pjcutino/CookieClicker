import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [ 
  {
    path:"", //lazy load
    loadChildren: () => import('./components/home/home.module').then(mod => mod.HomeModule),
  },
  {
    path:"game", //lazy load
    loadChildren: () => import('./components/game/game.module').then(mod => mod.GameModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
