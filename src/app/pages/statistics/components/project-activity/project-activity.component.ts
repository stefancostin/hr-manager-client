import { Component, OnDestroy } from '@angular/core';
import { ProgressInfo, StatsProgressBarData } from '../../../../@core/data/stats-progress-bar';
import { takeWhile } from 'rxjs/operators';
import { StatisticService } from '../../services/statistic.service';

@Component({
  selector: 'hr-project-activity',
  styleUrls: ['./project-activity.component.scss'],
  templateUrl: './project-activity.component.html',
})
export class ProjectActivityComponent implements OnDestroy {
  public projectActivity: Array<any>;
  private alive = true;

  progressInfoData: ProgressInfo[];

  constructor(private statsProgressBarService: StatsProgressBarData,
              private statisticService: StatisticService) {
    this.statsProgressBarService.getProgressInfoData()
      .pipe(takeWhile(() => this.alive))
      .subscribe((data) => {
        this.progressInfoData = data;
      });

    this.statisticService.getProjectActivity().subscribe(projectActivityCollection => {
      this.projectActivity = projectActivityCollection.data;
    });
  }

  ngOnDestroy() {
    this.alive = true;
  }
}
