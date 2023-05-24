import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Processo } from '../types/Processo';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AnalysisApi {

  constructor(private readonly http: HttpClient) { }

  public fetchProcessosData(name: string) {
    // https://rxjs.dev/deprecations/to-promise
    return firstValueFrom(this.http.post<Processo[]>(
      '/api/processos',
     { movimento: name }
    ));
  }
}
