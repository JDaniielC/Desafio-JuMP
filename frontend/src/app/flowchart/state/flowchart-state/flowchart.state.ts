import { Injectable } from '@angular/core';
import { ProcessoStatistics } from '../../types/ProcessoStatistics';
import { BehaviorSubject } from 'rxjs';
import { SafeHtml } from '@angular/platform-browser';

@Injectable()
export class FlowchartState {
  private readonly processoStatistics = new BehaviorSubject({} as ProcessoStatistics);
  private readonly flowgraph = new BehaviorSubject({} as SafeHtml);

  public getProcessoStatistics() {
    return this.processoStatistics.asObservable();
  }

  public getFlowgraph() {
    return this.flowgraph.asObservable();
  }

  public setProcessoStatistics(processoStatistics: ProcessoStatistics) {
    this.processoStatistics.next(processoStatistics);
  }

  public setFlowgraph(flowgraph: SafeHtml) {
    this.flowgraph.next(flowgraph);
  }
}
