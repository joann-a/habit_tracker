import { NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute} from '@angular/router';
import { EditHabitComponent } from './pages/edit-habit/edit-habit.component';
import { HabitsOverviewComponent } from './pages/habits-overview/habits-overview.component';
import { NewHabitComponent } from './pages/new-habit/new-habit.component';
import {Resolver} from './resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: `/habits`,
    pathMatch: 'full',
  },
  { path: 'habits', component: HabitsOverviewComponent },
  { path: 'new-habit', component: NewHabitComponent },
  {path: 'edit-habit/:id', component: EditHabitComponent, resolve: {habit: Resolver}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  
}
