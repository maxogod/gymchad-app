import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development'

import Exercise from '../models/exercise.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivityService } from './activity.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  public exercise: Exercise | null = null;

  constructor(private http: HttpClient, private userService: UserService) { }

  private addExerciseFn: ((exercise: Exercise) => void) | undefined;

  private discardExerciseFn: (() => void) | undefined;

  public setExercise(exercise: Exercise): void {
    this.exercise = exercise;
  }

  public getExercise(): Exercise | null {
    return this.exercise;
  }

  setAddExerciseFn(fn: (exercise: Exercise) => void) {
    this.addExerciseFn = fn;
  }

  setDiscardExerciseFn(fn: () => void) {
    this.discardExerciseFn = fn;
  }

  addExercise(exercise: Exercise) {
    if (this.addExerciseFn) {
      this.addExerciseFn(exercise);
    }
  }

  discardExercise() {
    if (this.discardExerciseFn) {
      this.discardExerciseFn();
    }
  }

  public deleteExercise(exerciseId: string): void {
    const url = `${environment.domain}/api/exercise/${exerciseId}`;

    this.http.delete(url).subscribe((activity) => {
      const activityId = window.location.hash.split('/')[2];
      this.userService.deleteExerciseFromActivity(activityId, exerciseId);
    }, (error) => {
      if (error.status === 200) {
        const activityId = window.location.hash.split('/')[2];
        this.userService.deleteExerciseFromActivity(activityId, exerciseId);
        return;
      }
      alert("Something went wrong, please try again later.");
    });
  }

  public updateExercise(exercise: Exercise): void {
    const url = `${environment.domain}/api/exercise/${exercise.id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.http.put(
      url,
      exercise,
      { headers }).subscribe((exercise) => {
        const activityId = window.location.hash.split('/')[2];
        this.userService.updateExerciseFromActivity(activityId, exercise as Exercise);
      }, (error) => {
        alert("Something went wrong, please try again later.");
      });
  }

}
