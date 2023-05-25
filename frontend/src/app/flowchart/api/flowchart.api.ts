import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProcessoStatistics } from '../types/ProcessoStatistics';

@Injectable()
export class FlowchartApi {

  constructor(private readonly http: HttpClient) { }

  public fetchProcessoStatistics() {
    return this.http.get<ProcessoStatistics>('/api/processos/stats/');
  }
}
