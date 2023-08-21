import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { ActivityComponent } from './modules/activity/activity.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    title: 'Gymchad - Home',
  },
  {
    path: 'activity',
    component: ActivityComponent,
    title: 'Gymchad - Activity',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
