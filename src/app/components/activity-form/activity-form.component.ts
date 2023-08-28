import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Exercise from 'src/app/models/exercise.model';
import { ActivityService } from 'src/app/services/activity.service';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.scss']
})
export class ActivityFormComponent {

  public name: string = '';

  public banner: string = '';

  public exercises: Exercise[] = []

  public isAddExerciseOpen = false;

  public errors: string = '';

  constructor(
    private exerciseService: ExerciseService,
    private activityService: ActivityService,
    private router: Router
  ) {
    exerciseService.setAddExerciseFn(this.addExercise.bind(this));
    exerciseService.setDiscardExerciseFn(this.discardExercise.bind(this));
  }

  public submit(e: Event) {
    e.preventDefault();

    if (!this.name || !this.banner) {
      this.errors = 'Name and banner are required';
      return;
    }

    const newActivity$ = this.activityService.addActivity({
      id: '',
      name: this.name,
      banner: this.banner,
      exercises: this.exercises
    });

    newActivity$.subscribe((activity) => {
      this.router.navigate([`/activity/${activity.id}`]);
      window.location.reload();
    });
  }

  public toggleAddExercise() {
    this.errors = '';
    this.isAddExerciseOpen = !this.isAddExerciseOpen;
  }

  public addExercise(exercise: Exercise) {
    this.exercises.push(exercise);
    this.toggleAddExercise();
  }

  public discardExercise() {
    this.toggleAddExercise();
  }

  public toggleAddActivity() {
    this.activityService.toggleIsActivityFormOpen();
  }
}
