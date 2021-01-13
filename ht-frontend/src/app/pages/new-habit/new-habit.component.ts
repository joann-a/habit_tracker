import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HabitService } from 'src/app/services/habit.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-habit',
  templateUrl: './new-habit.component.html',
  styleUrls: ['./new-habit.component.scss'],
})
export class NewHabitComponent implements OnInit {
  constructor(private habitService: HabitService, private router: Router) {}

  ngOnInit(): void {}

  habitForm = new FormGroup({
    name: new FormControl('', Validators.required),
    why: new FormControl(''),
  });

  onSubmit() {
    // console.warn(this.habitForm.value);
    this.habitService
      .createHabit(
        this.habitForm.controls.name.value,
        this.habitForm.controls.why.value
      )
      .subscribe(
        (res) => {
          console.log(`res is ${res}`);
          this.router.navigate([`/habits`]); // or can use .navigate('../', relativeTo: this.route)
        }
        // (err) => console.log('error posting')
      );
  }
}
