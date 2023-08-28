import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import User from '../models/user.model';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private user$ = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) { }

  public getUser(): Observable<User | null> {
    return this.user$;
  }

  public init(): void {
    const h = this.http
      .get<User>('http://localhost:8080/api/auth/session')
      .subscribe((user) => {
        this.user$.next(user);
      });

    if ((h as any).isStopped) return;

    const p = this.login().subscribe((user) => {
      this.user$.next(user);
    }
    );

  }

  private login(): Observable<User | null> {

    const user = sessionStorage.getItem('loggedUser');
    if (!user) return of(null);
    const parsedUser = JSON.parse(user);

    const url = `http://localhost:8080/api/auth/login`;
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
    const url = `http://localhost:8080/api/auth/logout`;

    this.http.get(url).subscribe((user) => {
      this.user$.next(null);
    });
  }
}
