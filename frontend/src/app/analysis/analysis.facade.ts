import { Injectable } from "@angular/core";
import { AnalysisState } from "./state/analysis-state/analysis.state";
import { AnalysisApi } from "./api/analysis.api";
import { Processo } from './types/Processo';
import { FlowchartFacade } from "../flowchart/flowchart.facade";

@Injectable()
export class AnalysisFacade {
    public constructor(
        private readonly state: AnalysisState,
        private readonly api: AnalysisApi,
        private readonly flowchartFacade: FlowchartFacade
    ) {}

    public getProcessoData() {
        return this.state.getProcessoData();
    }

    public fetchProcessoData() {
      this.flowchartFacade.getMovimentacao().subscribe(async (movimentacao) => {
        try {
          const processosData: Processo[] = await this.api.fetchProcessosData(movimentacao)
          this.state.setProcessoData(processosData);
        } catch (error) {
          console.error(error);
        }
      });
   }
}
