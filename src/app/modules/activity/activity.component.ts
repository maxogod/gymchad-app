import { Component } from '@angular/core';
import Exercise from 'src/app/models/exercise.model';

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
        name: "ex1 pposfds",
        picture: "https://metro.co.uk/wp-content/uploads/2017/03/0c6021073bce714b365904efb2f1fb5b.jpg",
        description: "some descrip",
        sets: 1,
        reps: 2,
        time: 0
      },
      {
        id: "64e3c2695122076a30ff01e5",
        name: "ex1fdfd 00ss",
        picture: "https://cdn.vox-cdn.com/thumbor/1tPy-AFZtQwS8O2EfSWnUS2vHjM=/138x0:2361x1667/1200x800/filters:focal(138x0:2361x1667)/cdn.vox-cdn.com/uploads/chorus_image/image/55908333/1_KzqzL4Fz0a224QKJn0aY4w.0.jpeg",
        description: "some veeeery lonnggg descriptionnnnnnnnn fdsfsdbahfhsdabf fdshjabfhsdafhsdbfbh d",
        sets: 0,
        reps: 0,
        time: 3
      }
    ]
  }

  openedExercises: boolean[] = Array(this.activity.exercises.length).fill(false);

  constructor() { }

  toggleDetails(index: number) {
    this.openedExercises[index] = !this.openedExercises[index];
  }

}
