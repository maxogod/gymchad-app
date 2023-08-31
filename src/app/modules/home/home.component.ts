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

  public isLoading = true;

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
    activityService.setToggleIsActivityFormOpenFn(this.closeForms.bind(this));
    activityService.setToggleIsUpdateActivityOpenFn(this.closeForms.bind(this));
  }

  ngOnInit(): void {
    this.user$ = this.userService.getUser();

    this.userService.setIsLoadingFn((isLoading: boolean) => this.isLoading = isLoading);
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
  }

  public closeForms() {
    this.isAddActivityOpen = false;
    this.isUpdateActivityOpen = false;
  }

  public openAddActivity() {
    this.isAddActivityOpen = true;
  }

  public openUpdateActivity(activity: Activity) {
    this.activityService.setActivity(activity);
    this.isUpdateActivityOpen = true;
  }
}
