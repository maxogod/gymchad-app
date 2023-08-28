import { Component } from '@angular/core';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
  selector: 'app-exersice-form',
  templateUrl: './exersice-form.component.html',
  styleUrls: ['./exersice-form.component.scss']
})
export class ExersiceFormComponent {

  public name: string = '';
  public picture: string = '';
  public description: string = '';
  public sets: number = 0;
  public reps: number = 0;
  public time: number = 0;

  public setsAndReps = true;

  public errors: string = '';

  constructor(private exerciseService: ExerciseService) { }

  onAddExercise() {

    if (!this.name || !this.picture || !this.description) {
      this.errors = 'Name, picture and description are required';
      return;
    }

    if (this.description.length > 100) {
      this.errors = 'Description must be less than 100 characters';
      return;
    }

    if (this.setsAndReps && (!this.sets || !this.reps)) {
      this.errors = 'Sets and reps are required';
      return;
    }

    if (!this.setsAndReps && !this.time) {
      this.errors = 'Time is required';
      return;
    }

    this.exerciseService.addExercise({
      id: "",
      name: this.name,
      picture: this.picture,
      description: this.description,
      sets: this.sets,
      reps: this.reps,
      time: this.time
    });
  }

  onDiscardExercise() {
    this.exerciseService.discardExercise();
  }

  toggleSetsAndReps() {
    if (this.setsAndReps) {
      this.sets = 0;
      this.reps = 0;
    } else {
      this.time = 0;
    }
    this.setsAndReps = !this.setsAndReps;
  }
}
