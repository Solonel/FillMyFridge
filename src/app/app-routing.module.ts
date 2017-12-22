import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationComponent } from './front/authentication/authentication.component';
import { DashBoardComponent } from './back/dash-board/dash-board.component';

const routes: Routes = [
  { path: 'login', component: AuthenticationComponent },
  { path: 'administration', component: DashBoardComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
