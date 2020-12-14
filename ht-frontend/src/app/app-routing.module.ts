import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HabitsOverviewComponent } from './pages/habits-overview/habits-overview.component';

const routes: Routes = [{ path: '', component: HabitsOverviewComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
