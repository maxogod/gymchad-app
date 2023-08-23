import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import User from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

import { environment } from '../../../environments/environment.development'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  user: User | null = null;

  google_client_id = environment.google_client_id;

  activityPlaceholder = [
    {
      name: "Click the G next to the avatar to login",
      banner: "https://www.creativefabrica.com/wp-content/uploads/2020/02/13/Gym-Logo-Graphics-1-18.jpg",
      link: ''
    },
    {
      name: "Have any suggestions? Click here",
      banner: "https://i0.wp.com/www.silocreativo.com/en/wp-content/uploads/2017/02/tips-logo-design.jpg",
      link: 'https://github.com/maxogod/gymchad-app/issues'
    }
  ]

  // constructor(private userService: UserService) { }

  // ngOnInit(): void {
  //   this.user$ = this.userService.signup();
  // }

  logoutOrLogin() {
    this.user ? this.logout() : this.login()
  }

  login() { }

  logout() { }

}

// user = {
  //   name: 'max',
  //   email: 'max@gmail.com',
  //   picture: 'https://pm1.aminoapps.com/7518/09151b9c80012650c35e79028e23063472f6c739r1-981-984v2_uhq.jpg',
  //   activities: [
  //     {
  //       id: "64e3c2695122076a30ff01e6",
  //       name: "first",
  //       banner: "https://dotesports.com/wp-content/uploads/2022/06/30123010/Castelia_Gym_field.png",
  //       exercises: [
  //         {
  //           id: "64e3c2695122076a30ff01e5",
  //           name: "ex1",
  //           picture: "some pic",
  //           description: "some descrip",
  //           sets: 1,
  //           reps: 2,
  //           time: 3
  //         },
  //         {
  //           id: "64e3c2695122076a30ff01e5",
  //           name: "ex1",
  //           picture: "some pic",
  //           description: "some descrip",
  //           sets: 1,
  //           reps: 2,
  //           time: 3
  //         }
  //       ]
  //     },
  //     {
  //       id: "64e3c2695122076a30ff01e7",
  //       name: "second",
  //       banner: "https://static.fandomspot.com/images/12/11046/00-featured-misty-starmie-battle-in-gym.jpg",
  //       exercises: [
  //         {
  //           id: "64e3c2695122076a30ff01e5",
  //           name: "ex1",
  //           picture: "some pic",
  //           description: "some descrip",
  //           sets: 1,
  //           reps: 2,
  //           time: 3
  //         }
  //       ]
  //     },
  //   ]
  // }