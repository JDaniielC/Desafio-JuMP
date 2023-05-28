import { Injectable } from '@angular/core';
import { FlowchartState } from './state/flowchart-state/flowchart.state';
import { FlowchartApi } from './api/flowchart.api';
import { SafeHtml } from '@angular/platform-browser';
import { take } from 'rxjs';
import { ProcessoStatistics } from './types/ProcessoStatistics';
import { ImageApiService } from '../shared/services/image-api/image-api.service';

@Injectable()
export class FlowchartFacade {
  public constructor(
    private readonly state: FlowchartState,
    private readonly api: FlowchartApi,
    private readonly imageService: ImageApiService,
  ) {}

  public fetchFlowgraph() {
    this.imageService.fetchFlowGraph().subscribe((flowgraph) => {
      this.setFlowgraph(flowgraph);
    }).add(() => {
      this.fetchProcessoStatistics();
    });

    this.imageService.getFlowGraph().subscribe((flowgraph) => {
      this.setFlowgraph(flowgraph);
    });
  }

  public getFlowgraph() {
    return this.state.getFlowgraph();
  }

  public getProcessoStatistics() {
    return this.state.getProcessoStatistics();
  }

  public getQueryParams() {
    return this.state.getQueryParams();
  }

  public setFlowgraph(flowgraph: SafeHtml) {
    this.state.setFlowgraph(flowgraph);
  }

  public setProcessoStatistics(processoStatistics: ProcessoStatistics) {
    this.state.setProcessoStatistics(processoStatistics);
  }

  public fetchProcessoStatistics() {
    return this.api
      .fetchProcessoStatistics()
      .pipe(take(1))
      .subscribe((processosStatistics: ProcessoStatistics) => {
        this.setProcessoStatistics(processosStatistics);
      });
  }

  public setQueryParams(movimento: string) {
    this.state.setQueryParams(movimento);
  }
}
