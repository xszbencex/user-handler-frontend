import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './shared/config/AuthGuard';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent, data: { title: 'Web Frontend - Bejelentkezés' } },
  { path: 'login', component: LoginComponent, data: { title: 'Web Frontend - Bejelentkezés' } },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard], data: { title: 'Web Frontend - Főoldal' } },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
