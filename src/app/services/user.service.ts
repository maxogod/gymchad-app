import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development'

import User from '../models/user.model';
import { BehaviorSubject, Observable, catchError, of, tap, throwError } from 'rxjs';
import Activity from '../models/activity.model';
import Exercise from '../models/exercise.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private user$ = new BehaviorSubject<User | null>(null);

  private isLoadingFn: ((isLoading: boolean) => void) | undefined;

  constructor(private http: HttpClient) { }

  public setIsLoadingFn(fn: ((isLoading: boolean) => void)): void {
    this.isLoadingFn = fn;
  }

  public getUser(): Observable<User | null> {
    if (!this.user$.value) {
      this.init();
    }
    if (this.user$.value) {
      this.isLoadingFn?.(false);
    }
    return this.user$;
  }

  public init(): void {
    this.isLoadingFn?.(true);
    this.http
      .get<User>(`${environment.domain}/api/auth/session`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            return this.login();
          } else {
            return of(null);
          }
        })
      )
      .subscribe((user: User | null) => {
        if (user !== null) {
          this.user$.next(user);
        }
        this.isLoadingFn?.(false);
      }, (error) => {
        this.isLoadingFn?.(false);
      });
  }

  private login(): Observable<User | null> {

    const user = sessionStorage.getItem('loggedUser');
    if (!user) return of(null);
    const parsedUser = JSON.parse(user);

    const url = `${environment.domain}/api/auth/login`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<User>(
      url,
      {
        email: parsedUser.email,
        googleId: parsedUser.sub,
        name: parsedUser.name,
        picture: parsedUser.picture,
      },
      { headers });
  }

  public logout(): void {
    const url = `${environment.domain}/api/auth/logout`;

    this.http.get(url).subscribe((user) => {
      this.user$.next(null);
      window.location.reload();
    }, (error) => {
      window.location.reload();
    });
  }

  public deleteActivity(activityId: string): void {
    const user = this.user$.value;
    if (!user) return;
    const activityIndex = user.activities.findIndex(activity => activity.id === activityId);
    user.activities.splice(activityIndex, 1);
    this.user$.next(user);
  }

  public deleteExerciseFromActivity(activityId: string, exerciseId: string): void {
    const user = this.user$.value;
    if (!user) return;
    const activityIndex = user.activities.findIndex(activity => activity.id === activityId);
    const exerciseIndex = user.activities[activityIndex].exercises.findIndex(exercise => exercise.id === exerciseId);
    user.activities[activityIndex].exercises.splice(exerciseIndex, 1);
    this.user$.next(user);
  }

  public addActivity(activity: Activity): void {
    const user = this.user$.value;
    if (!user) return;
    user.activities.push(activity);
    this.user$.next(user);
  }

  public updateActivity(updatedActivity: Activity): void {
    const user = this.user$.value;
    if (!user) return;
    const activityIndex = user.activities.findIndex(activity => activity.id === updatedActivity.id);
    user.activities[activityIndex] = updatedActivity;
    this.user$.next(user);
  }

  public updateExerciseFromActivity(activityId: string, updatedExercise: Exercise): void {
    const user = this.user$.value;
    if (!user) return;
    const activityIndex = user.activities.findIndex(activity => activity.id === activityId);
    const exerciseIndex = user.activities[activityIndex].exercises.findIndex(exercise => exercise.id === updatedExercise.id);
    user.activities[activityIndex].exercises[exerciseIndex] = updatedExercise;
    this.user$.next(user);
  }
}
