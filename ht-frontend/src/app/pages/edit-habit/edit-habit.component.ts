import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Habit } from 'src/app/models/habit.model';
import { HabitService } from 'src/app/services/habit.service';
import { Resolver } from '../../resolver';

@Component({
  selector: 'app-edit-habit',
  templateUrl: './edit-habit.component.html',
  styleUrls: ['./edit-habit.component.scss'],
})
export class EditHabitComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private habitService: HabitService,
    private route: ActivatedRoute
  ) {}

  currhabit: Habit;
  editHabitForm = this.fb.group({
    name: ['', Validators.required],
    why: [''],
  });

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      console.log("loaded data");
      console.log(data);
      this.currhabit = data.habit;
    });
  }
}
