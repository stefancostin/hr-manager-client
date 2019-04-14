import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { StatisticsRoutingModule } from './statistics-routing.module';
import { StatisticsComponent } from './components/statistics.component';
import { TeamActivityComponent } from './components/team-activity/team-activity.component';
import { ProjectActivityComponent } from './components/project-activity/project-activity.component';
import { TotalClosedIncidentsComponent } from './components/total-closed-incidents/total-closed-incidents.component';
import { AssignedEmployeesComponent } from './components/assigned-employees/assigned-employees.component';
import { ChartsPanelComponent } from './components/charts-panel/charts-panel.component';
import { ProfitChartComponent } from './components/charts-panel/charts/profit-chart.component';
import { OrdersChartComponent } from './components/charts-panel/charts/orders-chart.component';
import { ChartPanelSummaryComponent } from './components/charts-panel/chart-panel-summary/chart-panel-summary.component';
import { ChartPanelHeaderComponent } from './components/charts-panel/chart-panel-header/chart-panel-header.component';
import { LegendChartComponent } from './components/charts-panel/legend-chart/legend-chart.component';

@NgModule({
  declarations: [
    StatisticsComponent,
    TeamActivityComponent,
    ProjectActivityComponent,
    TotalClosedIncidentsComponent,
    AssignedEmployeesComponent,
    ChartsPanelComponent,
    ProfitChartComponent,
    OrdersChartComponent,
    ChartPanelSummaryComponent,
    ChartPanelHeaderComponent,
    LegendChartComponent
  ],
  imports: [
    CommonModule,
    StatisticsRoutingModule,
    ThemeModule,
    NgxEchartsModule,
    NgxChartsModule
  ]
})
export class StatisticsModule { }
