import { Component } from '@angular/core';
import { map } from 'rxjs';
import { ActivityService } from 'src/app/services/activity.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-activity',
  templateUrl: './update-activity.component.html',
  styleUrls: ['./update-activity.component.scss']
})
export class UpdateActivityComponent {

  public activity$ = this.activityService.getActivity();

  public id: string = '';

  public name: string = '';

  public banner: string = '';

  public errors: string = '';

  constructor(private activityService: ActivityService, private userService: UserService) { }

  ngOnInit(): void {
    this.activity$.pipe(map(activity => activity)).subscribe((activity) => {
      this.id = activity?.id || '';
      this.name = activity?.name || '';
      this.banner = activity?.banner || '';
    });
  }

  public submit(e: Event) {
    e.preventDefault();

    if (!this.name || !this.banner) {
      this.errors = 'Name and banner are required';
      return;
    }

    const newActivity$ = this.activityService.updateActivity({
      id: this.id,
      name: this.name,
      banner: this.banner,
      exercises: []
    });

    newActivity$.subscribe((activity) => {
      this.userService.updateActivity(activity);
      this.activityService.toggleIsUpdateActivityOpen();
    }, (error) => {
      alert("Something went wrong, please try again later.");
    });
  }

  public toggleAddActivity() {
    this.activityService.toggleIsUpdateActivityOpen();
  }

}
