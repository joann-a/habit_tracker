import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HabitService } from '../../services/habit.service';
import { Habit } from '../../models/habit.model';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-habits-overview',
  templateUrl: './habits-overview.component.html',
  styleUrls: ['./habits-overview.component.scss'],
})
export class HabitsOverviewComponent implements OnInit {
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;
  habits: any[];

  constructor(
    private habitService: HabitService,
    private route: ActivatedRoute
  ) {}

  // on initialisation get all habits
  ngOnInit(): void {
    this.route.params.subscribe(() => {
      // console.log(params);
      this.habitService.getHabits().subscribe((habits: any[]) => {
        // console.log(habits);
        this.habits = habits;
      });
    });
  }

  onClickHabit(habit: Habit) {
    this.habitService.completed(habit).subscribe((res) => {
      console.log(`res ${res}`);
      console.log('completed');
      habit.completed = !habit.completed;
      console.log(habit);
    });
  }

  onClickRemove(habit: Habit) {
    if (confirm('Are you sure you want to delete this habit?')) {
      // delete from the array of habits
      this.habits = this.habits.filter(item => item !== habit);

      this.habitService.deleteHabit(habit).subscribe((res) => {
        // console.log(res);
        console.log('deleted form db');
      });
    }
    
  }
}
