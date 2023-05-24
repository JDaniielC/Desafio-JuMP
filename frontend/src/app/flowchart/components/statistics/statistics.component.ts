import { Component, Input } from '@angular/core';
import { ProcessoStatistics } from '../../types/ProcessoStatistics';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent {
  @Input() data: ProcessoStatistics = {} as ProcessoStatistics;

}
