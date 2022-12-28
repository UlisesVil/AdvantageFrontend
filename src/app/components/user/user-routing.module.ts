import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserMainComponent } from "./user-main/user-main.component";

const routes: Routes = [
  { path: 'user-main', component: UserMainComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
