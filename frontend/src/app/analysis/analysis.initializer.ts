import { APP_INITIALIZER } from '@angular/core';
import { AnalysisFacade } from './analysis.facade';

export const analysisInitializer = (analysisFacade: AnalysisFacade) => () => {
  analysisFacade.fetchProcessoData('A01')
};

export const analysisInitializerProvider = {
	provide: APP_INITIALIZER,
	useFactory: analysisInitializer,
	multi: true,
	deps: [AnalysisFacade],
};

