import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { GameComponent } from './game.component';
import { GameRoutingModule } from './game-routing.module';
import { RouterLinkActive } from '@angular/router';
import { CoffeeMakerComponent } from './coffee-maker/coffee-maker.component';
import { MegaCoffeeMakerComponent } from './mega-coffee-maker/mega-coffee-maker.component';

@NgModule({
  declarations: [GameComponent, CoffeeMakerComponent, MegaCoffeeMakerComponent],
  imports: [
    CommonModule,
    SharedModule.forRoot(),
    GameRoutingModule
  ],
  exports:[GameComponent]
})
export class GameModule { }
