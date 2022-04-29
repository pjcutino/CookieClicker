import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { GameComponent } from './game.component';
import { GameRoutingModule } from './game-routing.module';

@NgModule({
  declarations: [GameComponent],
  imports: [
    CommonModule,
    SharedModule.forRoot(),
    GameRoutingModule
  ],
  exports:[GameComponent]
})
export class GameModule { }
