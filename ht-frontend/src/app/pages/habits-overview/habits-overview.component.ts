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
  // for delete and edit icons
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;

  habits: any[];
  date: Date = new Date();
  lastCompleted: number;
  currDay: number = this.date.getDate();

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
        this.resetCompletion(this.habits)
      });

    });

  }

  onClickHabit(habit: Habit) {
    const currHabit = new Habit();
    this.habitService.completed(habit).subscribe((res) => {
      console.log(res);

      habit.completed = !habit.completed;
      currHabit.lastCompleted = new Date(res['lastCompleted']);
      console.log(`last completed ${currHabit.lastCompleted}`);

      // update streak 
      if (currHabit.lastCompleted.getDate() < this.currDay - 1) {
        // console.log("need to reset streak");
        habit.streak = 0;
        this.habitService.resetStreak(habit).subscribe((res) => {
        });
      } else {
        habit.streak = habit.streak + 1;
        this.habitService.updateStreak(habit).subscribe((res) => {
          console.log('updating streak');
        });
      }
      // console.log('completed');
    });
  }

  // use to delete a habit
  onClickRemove(habit: Habit) {
    if (confirm('Are you sure you want to delete this habit?')) {
      // delete from the array of habits
      this.habits = this.habits.filter((item) => item !== habit);

      this.habitService.deleteHabit(habit).subscribe((res) => {
        // console.log(res);
        // console.log('deleted form db');
      });
    }
  }

  resetCompletion = (habits: any[]) => {
      habits.forEach(habit => {
        this.habitService.resetCompleted(habit).subscribe((res) => {
        })
      });  
    }
}
