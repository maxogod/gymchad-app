import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  public activityName: string = '';

  constructor(private activityService: ActivityService, private route: ActivatedRoute) { }

  public ngOnInit(): void {
    this.activity$ = this.activityService.getActivity();

    this.activity$.subscribe(activity => {
      if (!activity) return;
      if (window.location.hash === '#/') return;
      this.activityName = activity.name;
    })
  }

  public unsetActivity(): void {
    this.activityService.unsetActivity();
    this.activityName = '';
  }

}
