import { Component } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import Activity from 'src/app/models/activity.model';
import Exercise from 'src/app/models/exercise.model';
import { ActivityService } from 'src/app/services/activity.service';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent {

  public activity$: Observable<Activity | null> = of(null);

  public openedExercises$: Observable<boolean[]> = of([]);

  public isAddExerciseOpen = false;

  public isUpdateExerciseOpen = false;

  constructor(
    private exerciseService: ExerciseService,
    private activityService: ActivityService,
    private route: ActivatedRoute
  ) {
    this.exerciseService.setDiscardExerciseFn(this.closeForm.bind(this));
    this.exerciseService.setAddExerciseFn(this.addExercise.bind(this));
  }

  ngOnInit(): void {

    this.activity$ = this.activityService.getActivity();

    this.openedExercises$ = this.activity$.pipe(
      map(activity => Array(activity?.exercises.length).fill(false))
    )

    this.route.params.subscribe(params => {
      this.activityService.initWithId(params['id']);
    })
  }

  public toggleDetails(index: number) {
    this.openedExercises$ = this.openedExercises$.pipe(map(openedExercises => {
      const updatedExercises = [...openedExercises];
      updatedExercises[index] = !updatedExercises[index];
      return updatedExercises;
    }));
  }

  public addExercise(exercise: Exercise) {
    const updatedActivity$ = this.activityService.addExercise(exercise);

    updatedActivity$.subscribe(activity => {
      window.location.reload();
    })

    this.closeForm();
  }

  public openAddExercise() {
    this.isAddExerciseOpen = !this.isAddExerciseOpen;
  }

  public deleteExercise(exerciseId: string) {
    console.log(exerciseId);
    this.exerciseService.deleteExercise(exerciseId);
  }

  public closeForm() {
    this.isUpdateExerciseOpen = false
    this.isAddExerciseOpen = false;
  }

  public openUpdateExercise(exercise: Exercise) {
    this.exerciseService.setExercise(exercise)
    this.isUpdateExerciseOpen = !this.isUpdateExerciseOpen;
  }

}
