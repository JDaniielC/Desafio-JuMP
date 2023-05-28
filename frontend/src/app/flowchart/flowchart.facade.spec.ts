import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { FlowchartFacade } from './flowchart.facade';
import { FlowchartApi } from './api/flowchart.api';
import { FlowchartState } from './state/flowchart-state/flowchart.state';
import { ImageApiService } from '../shared/services/image-api/image-api.service';
import { ProcessoStatistics } from './types/ProcessoStatistics';

describe('FlowchartFacade', () => {
  let facade: FlowchartFacade;
  let stateMock: Partial<FlowchartState>;
  let apiMock: Partial<FlowchartApi>;
  let imageServiceMock: Partial<ImageApiService>;

  beforeEach(() => {
    stateMock = {
      getFlowgraph: () => of(''),
      getProcessoStatistics: () => of({} as ProcessoStatistics),
      getQueryParams: () => of(''),
      setFlowgraph: () => {},
      setProcessoStatistics: () => {},
      setQueryParams: () => {},
    };

    apiMock = {
      fetchProcessoStatistics: () => of({} as ProcessoStatistics),
    };

    imageServiceMock = {
      fetchFlowGraph: () => of(''),
      getFlowGraph: () => of(''),
    };

    TestBed.configureTestingModule({
      providers: [
        FlowchartFacade,
        { provide: FlowchartState, useValue: stateMock },
        { provide: FlowchartApi, useValue: apiMock },
        { provide: ImageApiService, useValue: imageServiceMock },
      ],
    });

    facade = TestBed.inject(FlowchartFacade);
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });
});
