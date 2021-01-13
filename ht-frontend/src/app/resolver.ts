// resolver.ts
import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HabitService } from './services/habit.service';
import { Habit } from './models/habit.model';
@Injectable()
export class Resolver implements Resolve<Observable<string>> {
  constructor(private HabitService: HabitService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    // subscribes automatically to getHabit obersvable returned and provides router with fetched data
    return this.HabitService.getHabit(route.paramMap.get('id'));
  }
}
