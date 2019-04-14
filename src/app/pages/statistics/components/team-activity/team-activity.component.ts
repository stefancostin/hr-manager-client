import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';

import { UserActivityData, UserActive } from '../../../../@core/data/user-activity';
import { StatisticService } from '../../services/statistic.service';

@Component({
  selector: 'hr-team-activity',
  templateUrl: './team-activity.component.html',
  styleUrls: ['./team-activity.component.scss'],
})
export class TeamActivityComponent implements OnDestroy {
  public teamActivity: Array<any>;
  private alive = true;

  userActivity: UserActive[] = [];
  type = 'month';
  types = ['week', 'month', 'year'];
  currentTheme: string;

  constructor(private themeService: NbThemeService,
              private statisticService: StatisticService,
              private userActivityService: UserActivityData) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.currentTheme = theme.name;
    });

    this.statisticService.getTeamActivity().subscribe(teamActivityCollection => {
      this.teamActivity = teamActivityCollection.data;
    });
  }

  getUserActivity(period: string) {
    this.userActivityService.getUserActivityData(period)
      .pipe(takeWhile(() => this.alive))
      .subscribe(userActivityData => {
        this.userActivity = userActivityData;
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
