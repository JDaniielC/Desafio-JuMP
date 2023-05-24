import { Injectable } from "@angular/core";
import { AnalysisState } from "./state/analysis-state/analysis.state";
import { AnalysisApi } from "./api/analysis.api";
import { Processo } from './types/Processo';

@Injectable()
export class AnalysisFacade {
    public constructor(
        private readonly state: AnalysisState,
        private readonly api: AnalysisApi,
    ) {}

    public getProcessoData() {
        return this.state.getProcessoData();
    }

    public async fetchProcessoData(name: string) {
      try {
        const processosData: Processo[] = await this.api.fetchProcessosData(name)
        this.state.setProcessoData(processosData);
      } catch (error) {
        console.error(error);
      }
   }
}
