import { APP_INITIALIZER } from '@angular/core';
import { AnalysisFacade } from './analysis.facade';
import { AnalysisApi } from './api/analysis.api';
import { AnalysisState } from './state/analysis-state/analysis.state';
import { Processo } from './types/Processo';

export const analysisInitializer = (
    facade: AnalysisFacade,
    api: AnalysisApi,
    state: AnalysisState,
  ) => () => {

  facade.getQueryParams().subscribe(
    async (params) => {
    try {
      const response: Processo[] = await
        api.fetchProcessosData(params)
      state.setProcessoData(response);
    } catch (error) {
      console.error(error);
    }
  });
};

export const analysisInitializerProvider = {
  provide: APP_INITIALIZER,
  useFactory: analysisInitializer,
  multi: true,
  deps: [AnalysisFacade, AnalysisApi, AnalysisState],
};
