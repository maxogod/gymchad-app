import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  user = {
    name: 'max',
    email: 'max@gmail.com',
    picture: 'https://pm1.aminoapps.com/7518/09151b9c80012650c35e79028e23063472f6c739r1-981-984v2_uhq.jpg',
    activities: [
      {
        id: "64e3c2695122076a30ff01e6",
        name: "first",
        banner: "https://dotesports.com/wp-content/uploads/2022/06/30123010/Castelia_Gym_field.png",
        exercises: [
          {
            id: "64e3c2695122076a30ff01e5",
            name: "ex1",
            picture: "some pic",
            description: "some descrip",
            sets: 1,
            reps: 2,
            time: 3
          },
          {
            id: "64e3c2695122076a30ff01e5",
            name: "ex1",
            picture: "some pic",
            description: "some descrip",
            sets: 1,
            reps: 2,
            time: 3
          }
        ]
      },
      {
        id: "64e3c2695122076a30ff01e7",
        name: "second",
        banner: "https://static.fandomspot.com/images/12/11046/00-featured-misty-starmie-battle-in-gym.jpg",
        exercises: [
          {
            id: "64e3c2695122076a30ff01e5",
            name: "ex1",
            picture: "some pic",
            description: "some descrip",
            sets: 1,
            reps: 2,
            time: 3
          }
        ]
      },
    ]
  }
}
