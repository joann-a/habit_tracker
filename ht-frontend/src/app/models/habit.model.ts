export class Habit {
  _id: string;
  name: string;
  desc: string;
  why: string;
  completed: Boolean;
  streak: number;
  lastCompleted: Date = new Date();
}
