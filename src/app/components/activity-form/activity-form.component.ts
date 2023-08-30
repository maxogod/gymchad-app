import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Exercise from 'src/app/models/exercise.model';
import { ActivityService } from 'src/app/services/activity.service';
import { ExerciseService } from 'src/app/services/exercise.service';
import { UserService } from 'src/app/services/user.service';

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
    private userService: UserService,
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
      this.userService.addActivity(activity);
      this.router.navigate([`/activity/${activity.id}`]);
    }, (error) => {
      alert("There has been an error, please try again later");
    });
  }

  public toggleAddExercise() {
    this.errors = '';
    this.isAddExerciseOpen = !this.isAddExerciseOpen;
  }

  public addExercise(exercise: Exercise) {
    this.exercises.push({
      name: exercise.name,
      description: exercise.description,
      picture: exercise.picture,
      sets: exercise.sets,
      reps: exercise.reps,
      time: exercise.time
    });
    this.toggleAddExercise();
  }

  public discardExercise() {
    this.toggleAddExercise();
  }

  public toggleAddActivity() {
    this.activityService.toggleIsActivityFormOpen();
  }
}
