import { Component } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import User from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

import { environment } from '../../../environments/environment.development'
import { ActivityService } from 'src/app/services/activity.service';
import Activity from 'src/app/models/activity.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  public user$: Observable<User | null> = of(null);

  public isAddActivityOpen = false;

  public isUpdateActivityOpen = false;

  protected google_client_id = environment.google_client_id;

  public activityPlaceholder = [
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

  constructor(private userService: UserService, private activityService: ActivityService) {
    activityService.setToggleIsActivityFormOpenFn(this.toggleAddActivity.bind(this));
    activityService.setToggleIsUpdateActivityOpenFn(this.toggleUpdateActivity.bind(this));
  }

  ngOnInit(): void {
    this.user$ = this.userService.getUser();

    this.userService.init();
  }

  public deleteActivity(activityId: string) {
    this.activityService.deleteActivity(activityId);
  }

  public logoutOrLogin() {
    this.user$.pipe(map(user => user)) ? this.logout() : this.login()
  }

  public login() { }

  public logout() {
    sessionStorage.removeItem('loggedUser');
    this.user$ = of(null);
    this.userService.logout();
    window.location.reload();
  }

  public toggleAddActivity() {
    this.isAddActivityOpen = !this.isAddActivityOpen;
  }

  public toggleUpdateActivity() {
    this.isUpdateActivityOpen = !this.isUpdateActivityOpen;
  }

  public openUpdateActivity(activity: Activity) {
    this.activityService.setActivity(activity);
    this.toggleUpdateActivity();
  }
}
