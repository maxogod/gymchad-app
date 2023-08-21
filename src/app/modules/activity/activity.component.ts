import { Component } from '@angular/core';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent {

  activity = {
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
  }

}
