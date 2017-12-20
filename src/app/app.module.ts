import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { AuthenticationComponent } from './Front/authentication/authentication.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { AuthService } from './services/auth.service';


const routes = [
  { path: 'login', component: AuthenticationComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    MainMenuComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
