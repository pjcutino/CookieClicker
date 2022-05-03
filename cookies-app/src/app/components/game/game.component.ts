import { AfterContentInit, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersistanceService } from 'src/app/shared/services/localstorage.service';
import { User } from 'src/app/shared/services/models/user';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements AfterContentInit  {

  userName? : string;
  user? : User;
  
  // costs
  autoClickerBaseCost : number = 20;
  autoClickerCost : number = 20;
  megaAutoClickerBaseCost: number = 300;
  megaAutoClickerCost: number = 300;
  clickerBaseCost: number = 10;
  clickerCost: number = 10;
  
  // increase by tick
  autoClickerValue : number = 2;
  megaAutoClickerValue : number = 10;

  // limits
  autoPressLimit : number = 13;
  autoMachineLimit : number = 13;

  // timers and loops
  autoPressIntervalId: any;
  autoMachineIntervalId: any;
  rushHourIntervalId: any;
  firstClickIntervalId: any;

  // rush hour
  rushHourMultiplier: number = 1;
  rushHourTime: number = 10;
  rushHourInit: boolean = true;
  rushHourProbability: number = 2; //percent
  rushHourMaxMultiplier: number = 5;

  // "click here" banner
  isFirstClick: boolean = false;
  firstClickRefresh: number = 3;

  @ViewChild('pressBtn') pressBtn! : ElementRef;
  @ViewChild('machineBtn') machineBtn! : ElementRef;
  @ViewChild('rushBanner') rushBanner! : ElementRef;

  constructor(private persistanceService: PersistanceService, private route : ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.userName = params.get('userName')!;
      const clientData = this.persistanceService.get(this.userName);
      this.user = Object.assign(new User(this.userName), clientData)
      console.log(this.user?.name);
    })
  }

  ngAfterContentInit(): void {
    // remember all set data
    this.clickerCost = this.clickerBaseCost + this.clickerBaseCost * this.user!.clickerLevel;
    this.autoClickerCost = this.autoClickerBaseCost + this.autoClickerBaseCost * this.user!.autoclickers;
    this.megaAutoClickerCost = this.megaAutoClickerBaseCost + this.megaAutoClickerBaseCost * this.user!.megaautoclickers;
    
    this.updateAutoClickerInterval();

    if(this.user!.autoclickers == this.autoPressLimit){
      this.pressBtn.nativeElement.innerText = "MAX";
    }
    if(this.user!.megaautoclickers == this.autoMachineLimit){
      this.machineBtn.nativeElement.innerText = "MAX";
    }
  }

  // probability
  rollProbability(probability: number) : boolean { 
    const res = Math.floor(Math.random() * (100) + 1);
    return (res <= probability) ? true : false;
  }

  clickAction(){
    // reset timer if clicked again
    if(this.firstClickIntervalId != null){
      clearTimeout(this.firstClickIntervalId);
      this.firstClickIntervalId = null;
      this.isFirstClick = false;
    }
    // activate rush hour if roll succeeds
    if(this.rushHourMultiplier == 1 && this.rollProbability(this.rushHourProbability)){
      this.rushHourMultiplier = this.rushHourMaxMultiplier;
      this.rushHourInit = false;
      this.rushHourIntervalId = setTimeout(() => {
        this.rushHourMultiplier = 1;
      }, 1000 * this.rushHourTime);
    }
    // if not clicked for X seconds show banner: Click Here
    if(this.isFirstClick == false){
      this.isFirstClick = true;
      this.firstClickIntervalId = setTimeout(() => {
        this.isFirstClick = false;
      }, 1000 * this.firstClickRefresh);
    }

    this.incrementClicks(this.user!.clickerLevel * this.rushHourMultiplier);
  }

  incrementClicks(incValue : number) : void {
    this.user!.clicks += incValue;
    this.updateUser();
  }

  incrementClicker() : void {
    if(this.user!.clicks >= this.clickerCost){
      this.user!.clicks -= this.clickerCost;
      this.user!.clickerLevel += 1;
      this.updateUser();

      this.clickerCost = this.clickerBaseCost + this.clickerBaseCost * this.user!.clickerLevel;
    }
  }

  incrementAutoClickers() : void {
    if(this.user!.autoclickers >= this.autoPressLimit){
      return;
    }
    if(this.user!.clicks >= this.autoClickerCost){
      this.user!.clicks -= this.autoClickerCost;
      this.user!.autoclickers += 1;
      this.updateUser();

      this.updateAutoClickerInterval();
      
      this.autoClickerCost = this.autoClickerBaseCost + this.autoClickerBaseCost * this.user!.autoclickers;
      if(this.user!.autoclickers >= this.autoPressLimit){
        this.pressBtn.nativeElement.innerText = "MAX";
      }
    }
  }

  incrementMegaAutoClickers() : void {
    if(this.user!.megaautoclickers >= this.autoMachineLimit){
      return;
    }
    if(this.user!.clicks >= this.megaAutoClickerCost){
      this.user!.clicks -= this.megaAutoClickerCost;
      this.user!.megaautoclickers += 1;
      this.updateUser();

      this.updateMegaAutoClickerInterval();
     
      this.megaAutoClickerCost = this.megaAutoClickerBaseCost + this.megaAutoClickerBaseCost * this.user!.megaautoclickers;
      if(this.user!.megaautoclickers == this.autoMachineLimit){
        this.machineBtn.nativeElement.innerText = "MAX";
      }
    }
  }

  updateUser() : void {
    this.persistanceService.set(this.userName!,this.user);
  }

  reset(){
    const currentUser = this.user!;
    currentUser.clicks = 0;
    currentUser.autoclickers = 0;
    currentUser.megaautoclickers = 0;
    currentUser.clickerLevel = 1;
    this.rushHourMultiplier = 1;
    this.updateUser();
    this.autoClickerCost = this.autoClickerBaseCost;
    
    clearInterval(this.autoPressIntervalId);
    clearInterval(this.autoMachineIntervalId);
    clearInterval(this.firstClickIntervalId);
  }


  numSequence(n: number): Array<number> {
    return Array(n);
  }

  updateAutoClickerInterval(){
    clearInterval(this.autoPressIntervalId);
    this.autoPressIntervalId = setInterval(() => {
      this.incrementClicks(this.autoClickerValue*this.user!.autoclickers);
    }, 1000); 
  }

  updateMegaAutoClickerInterval(){
    clearInterval(this.autoMachineIntervalId);
    this.autoMachineIntervalId = setInterval(() => {
      this.incrementClicks(this.megaAutoClickerValue*this.user!.megaautoclickers);
    }, 1000); 
  }

  numFormatter(num: number) {
    if(num > 999 && num < 1000000){
        return (num/1000).toFixed(1) + 'K'; // convert to K for number from > 1000 < 1 million 
    }else if(num > 1000000){
        return (num/1000000).toFixed(1) + 'M'; // convert to M for number from > 1 million 
    }else if(num < 900){
        return num; // if value < 1000, nothing to do
    }
    return num;
}

}
