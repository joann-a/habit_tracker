import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {Resolver} from './resolver'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HabitsOverviewComponent } from './pages/habits-overview/habits-overview.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NewHabitComponent } from './pages/new-habit/new-habit.component';
import { EditHabitComponent } from './pages/edit-habit/edit-habit.component';

@NgModule({
  declarations: [
    AppComponent,
    HabitsOverviewComponent,
    NavbarComponent,
    NewHabitComponent,
    EditHabitComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  providers: [Resolver],
  bootstrap: [AppComponent],
})
export class AppModule {}
