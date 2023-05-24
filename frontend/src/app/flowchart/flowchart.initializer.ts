import { APP_INITIALIZER } from '@angular/core';
import { FlowchartFacade } from './flowchart.facade';
import { ImageApiService } from '../shared/services/image-api.service';
import { SafeHtml } from '@angular/platform-browser';

export const flowchartInitializer = (
    FlowchartFacade: FlowchartFacade,
    imageApiService: ImageApiService
  ) => () => {
    imageApiService.getFlowGraph().subscribe((flowchart: SafeHtml) => {;
    FlowchartFacade.setFlowgraph(flowchart);
  });
 return FlowchartFacade.fetchProcessoStatistics();
};

export const flowchartInitializerProvider = {
	provide: APP_INITIALIZER,
	useFactory: flowchartInitializer,
	multi: true,
	deps: [FlowchartFacade, ImageApiService],
};

