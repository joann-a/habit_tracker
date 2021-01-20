import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Habit } from '../models/habit.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HabitService {
  readonly ROOT_URL;

  constructor(private http: HttpClient) {
    this.ROOT_URL = 'http://localhost:3000';
  }

  getHabits() {
    return this.http.get(`${this.ROOT_URL}/habits`);
  }

  getHabit(id) {
    return this.http.get(`${this.ROOT_URL}/edit-habit/${id}`);
  }

  createHabit(name: string, why: string) {
    console.log(name);
    return this.http.post(`${this.ROOT_URL}/new-habit`, { name, why });
  }

  editHabit(id: string, name: string, why: string) {
    // console.log('reached service');
    return this.http.patch(`${this.ROOT_URL}/habits/${id}`, {
      name,
      why,
    });
  }

  completed(habit: Habit) {
    return this.http.patch(`${this.ROOT_URL}/habits/${habit._id}`, {
      completed: !habit.completed,
      lastCompleted: Date.now(),
    });
  }

  resetCompleted(habit: Habit) {
    return this.http.patch(`${this.ROOT_URL}/habits/${habit._id}`, {
      completed: false,
    });
  }

  updateStreak(habit: Habit) {
    return this.http.patch(`${this.ROOT_URL}/habits/${habit._id}`, {
      streak: habit.streak + 1,
    });
  }

  resetStreak(habit: Habit) {
    console.log(habit._id);
    return this.http.patch(`${this.ROOT_URL}/habits/${habit._id}`, {
      streak: 0,
    });
  }

  deleteHabit(habit: Habit) {
    console.log(habit);
    return this.http.delete(`${this.ROOT_URL}/habits/${habit._id}`);
  }
}
