import { Component, OnDestroy } from '@angular/core';
import { ProcessoStatistics } from '../../types/ProcessoStatistics';
import { Subscription } from 'rxjs';
import { FlowchartFacade } from '../../flowchart.facade';
import { SafeHtml } from '@angular/platform-browser';
import { ImageApiService } from 'src/app/shared/services/image-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {
  statisticsData: ProcessoStatistics = {} as ProcessoStatistics;
  graphSource!: SafeHtml | null;
  subscription1$!: Subscription
  subscription2$!: Subscription

  constructor(
     private readonly facade: FlowchartFacade,
     private readonly imageApiService: ImageApiService
    ) {
    imageApiService.getFlowGraph().subscribe((flowchart: SafeHtml) => {;
      facade.setFlowgraph(flowchart);
    });
    facade.fetchProcessoStatistics();
    this.subscription1$ = facade.getProcessoStatistics()
      .subscribe((processoStatistics: ProcessoStatistics) => {
        this.statisticsData = processoStatistics;
      });
    this.subscription2$ = this.facade.getFlowgraph()
      .subscribe((graph: SafeHtml) => {
        this.graphSource = graph;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription1$) {
      this.subscription1$.unsubscribe();
    }
    if (this.subscription2$) {
      this.subscription2$.unsubscribe();
    }
  }
}
