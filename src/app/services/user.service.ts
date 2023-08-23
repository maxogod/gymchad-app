import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import User from '../models/user.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private user: User | null = null;

  constructor(private http: HttpClient) { }

  login(): Observable<User | null> {
    // get user from session storage
    const user = sessionStorage.getItem('loggedUser');
    if (!user) return of(null);
    const parsedUser = JSON.parse(user);

    const url = `http://localhost:8080/api/auth/login`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<User>(url, { email: parsedUser.email, googleId: parsedUser.sub }, { headers });
  }

  signup(): Observable<User | null> {
    const user = sessionStorage.getItem('loggedUser');
    if (!user) return of(null);
    const parsedUser = JSON.parse(user);

    const url = `http://localhost:8080/api/auth/signup`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<User>(url, { name: parsedUser.name, picture: parsedUser.picture, email: parsedUser.email, googleId: parsedUser.sub }, { headers });
  }
}
