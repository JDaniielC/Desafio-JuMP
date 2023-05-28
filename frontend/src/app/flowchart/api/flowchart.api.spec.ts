import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProcessoStatistics } from '../types/ProcessoStatistics';
import { FlowchartApi } from './flowchart.api';

describe('FlowchartApi', () => {
  let service: FlowchartApi;
  let httpTestingController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ FlowchartApi ],
    });
    service = TestBed.inject(FlowchartApi);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch processo statistics', () => {
    const mockProcessoStatistics: ProcessoStatistics = {
      movimentosCount: 10,
      casesCount: 5,
      avgCaseDuration: 10,
      avgMovimentoDuration: 5,
      avgMovimentosPerCase: 30
    };

    service.fetchProcessoStatistics().subscribe((processoStatistics: ProcessoStatistics) => {
      expect(processoStatistics).toEqual(mockProcessoStatistics);
    });

    const req = httpTestingController.expectOne('/api/processos/stats/');
    expect(req.request.method).toEqual('GET');
    req.flush(mockProcessoStatistics);
  });
});
