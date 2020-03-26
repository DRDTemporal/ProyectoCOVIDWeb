import { AuthGuard } from './shared/guard/auth.guard';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedGuard } from './shared/guard/logged.guard';
import { IndexComponent } from './components/index/index.component';


const routes: Routes = [
  { path: '', component: IndexComponent, canActivate: [LoggedGuard]},
  { path: 'iniciar-sesion', component: SignInComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
