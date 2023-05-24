import { Injectable } from '@angular/core';
import { FlowchartState } from './state/flowchart-state/flowchart.state';
import { FlowchartApi } from './api/flowchart.api';
import { SafeHtml } from '@angular/platform-browser';

@Injectable()
export class FlowchartFacade {
  public constructor(
    private readonly state: FlowchartState,
    private readonly api: FlowchartApi
  ) {}

  public getFlowgraph() {
    return this.state.getFlowgraph();
  }

  public getProcessoStatistics() {
    return this.state.getProcessoStatistics();
  }

  public getMovimentacao() {
    return this.state.getMovimentacao();
  }

  public setFlowgraph(flowgraph: SafeHtml) {
    this.state.setFlowgraph(flowgraph);
  }

  public async fetchProcessoStatistics() {
    this.api.fetchProcessoStatistics().subscribe((processosStatistics) => {
      this.state.setProcessoStatistics(processosStatistics);
    });
  }

  public setMovimentacao(movimentacao: string) {
    this.state.setMovimentacao(movimentacao);
  }
}
