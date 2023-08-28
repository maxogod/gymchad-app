import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import Activity from 'src/app/models/activity.model';
import { ActivityService } from 'src/app/services/activity.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  public activity$: Observable<Activity | null> = of(null);

  constructor(private activityService: ActivityService) { }

  public ngOnInit(): void {
    this.activity$ = this.activityService.getActivity();
  }

  public unsetActivity(): void {
    this.activityService.unsetActivity();
  }

}
