import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProcessoParams } from '../../types/processoParams';
import { Processo } from '../../types/Processo';

@Injectable()
export class AnalysisState {
  private readonly processoData = new BehaviorSubject([] as Processo[]);
  private readonly queryParams = new BehaviorSubject({
    movimento: 'A1',
    page: 1,
    per_page: 10,
  } as ProcessoParams);

  public getQueryParams() {
    return this.queryParams.asObservable();
  }

  public getProcessoData() {
    return this.processoData.asObservable();
  }

  public setProcessoData(processoData: Processo[]) {
    this.processoData.next(processoData);
  }

  public setQueryParams({ movimento, page, per_page }: ProcessoParams) {
    if (movimento) {
      this.queryParams.next({ ...this.queryParams.getValue(), movimento });
    }
    if (per_page) {
      this.queryParams.next({ ...this.queryParams.getValue(), per_page });
    }
    if (page) {
      this.queryParams.next({ ...this.queryParams.getValue(), page });
    }
  }
}
