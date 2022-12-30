import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserGuard } from '../app/guards/user.guard'

const routes: Routes = [
  {path:'home', loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule) },
  { path: 'session', loadChildren: () => import('./components/user-session/user-session.module').then(m => m.UserSessionModule) },
  { path: 'user', loadChildren: () => import('./components/user/user.module').then(m => m.UserModule), canActivate: [UserGuard] },
  {path:'**',pathMatch:'full', redirectTo: 'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
