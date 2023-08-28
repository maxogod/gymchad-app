import { Component } from '@angular/core';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
  selector: 'app-update-exercise',
  templateUrl: './update-exercise.component.html',
  styleUrls: ['./update-exercise.component.scss']
})
export class UpdateExerciseComponent {

  public exercise = this.exerciseService.getExercise();

  public id: string;
  public name: string;
  public picture: string;
  public description: string;
  public sets: number;
  public reps: number;
  public time: number;

  public setsAndReps = true;

  public errors: string = '';

  constructor(private exerciseService: ExerciseService) {
    this.id = this.exercise?.id || '';
    this.name = this.exercise?.name || '';
    this.picture = this.exercise?.picture || '';
    this.description = this.exercise?.description || '';
    this.sets = this.exercise?.sets || 0;
    this.reps = this.exercise?.reps || 0;
    this.time = this.exercise?.time || 0;

    this.setsAndReps = this.time === 0;
  }

  onUpdateExercise() {

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

    this.exerciseService.updateExercise({
      id: this.id,
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
