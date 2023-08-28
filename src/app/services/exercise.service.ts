import { Injectable } from '@angular/core';
import Exercise from '../models/exercise.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  public exercise: Exercise | null = null;

  constructor(private http: HttpClient) { }

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
    const url = `http://localhost:8080/api/exercise/${exerciseId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.http.delete(
      url,
      { headers }).subscribe(
        () => {
          window.location.reload();
        });
  }

  public updateExercise(exercise: Exercise): void {
    const url = `http://localhost:8080/api/exercise/${exercise.id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.http.put(
      url,
      exercise,
      { headers }).subscribe(
        () => {
          window.location.reload();
        });
  }

}
