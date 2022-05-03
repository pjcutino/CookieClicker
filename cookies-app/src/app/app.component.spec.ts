import { TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { FooterComponent } from './core/footer/footer.component';
import { HeaderComponent } from './core/header/header.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserModule,
        AppRoutingModule,
        CoreModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'cookies-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('cookies-app');
  });

  it(`should have header`, () => {
    const headerComp = TestBed.createComponent(HeaderComponent);
    const headerCompInstance = headerComp.componentInstance;
    expect(headerCompInstance).toBeTruthy();
  });
  it(`should have footer`, () => {
    const footerComp = TestBed.createComponent(FooterComponent);
    const footerCompInstance = footerComp.componentInstance;
    expect(footerCompInstance).toBeTruthy();
  });

});
