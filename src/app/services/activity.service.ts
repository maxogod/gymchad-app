import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import Activity from '../models/activity.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Exercise from '../models/exercise.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  private activity$ = new BehaviorSubject<Activity | null>(null);

  private id: string = '';

  private toggleIsActivityFormOpenFn: (() => void) | undefined;

  constructor(private http: HttpClient, private userService: UserService) { }

  public setActivity(activity: Activity): void {
    this.activity$.next(activity);
  }

  public getActivity(): Observable<Activity | null> {
    return this.activity$;
  }

  public initWithId(activityId: String): void {

    const activity = this.userService.getUser().pipe(
      map(user => {
        if (!user) return null;
        return user.activities.find(activity => activity.id === activityId);
      })
    )

    activity.subscribe(activity => {
      if (!activity) {
        this.activity$.next(null);
        return;
      }
      this.activity$.next(activity);
      this.id = activity.id;
    })

  }

  public addActivity(activity: Activity): Observable<Activity> {
    const url = `http://localhost:8080/api/activity/`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<Activity>(
      url,
      activity,
      { headers });
  }

  public updateActivity(activity: Activity): Observable<Activity> {
    const url = `http://localhost:8080/api/activity/${activity.id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.put<Activity>(
      url,
      activity,
      { headers });
  }

  public deleteActivity(activityId: string): void {
    const url = `http://localhost:8080/api/activity/${activityId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.http.delete(
      url,
      { headers }).subscribe(
        () => {
          window.location.reload();
        }
      );
  }

  public addExercise(exercise: Exercise): Observable<Activity> {
    const url = `http://localhost:8080/api/activity/add-exercise/${this.id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<Activity>(
      url,
      {
        name: exercise.name,
        picture: exercise.picture,
        description: exercise.description,
        sets: exercise.sets,
        reps: exercise.reps,
        time: exercise.time
      },
      { headers });
  }



  public unsetActivity(): void {
    this.activity$.next(null);
  }

  setToggleIsActivityFormOpenFn(fn: () => void) {
    this.toggleIsActivityFormOpenFn = fn;
  }

  toggleIsActivityFormOpen() {
    if (this.toggleIsActivityFormOpenFn) {
      this.toggleIsActivityFormOpenFn();
    }
  }

  setToggleIsUpdateActivityOpenFn(fn: () => void) {
    this.toggleIsActivityFormOpenFn = fn;
  }

  public toggleIsUpdateActivityOpen() {
    if (this.toggleIsActivityFormOpenFn) {
      this.toggleIsActivityFormOpenFn();
    }
  }

}
