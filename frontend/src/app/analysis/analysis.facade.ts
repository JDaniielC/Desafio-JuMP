import { Injectable } from "@angular/core";
import { AnalysisState } from "./state/analysis-state/analysis.state";
import { ProcessoParams } from "./types/processoParams";

@Injectable()
export class AnalysisFacade {
    public constructor(
        private readonly state: AnalysisState,
    ) {}

    public getProcessoData() {
        return this.state.getProcessoData();
    }

    public getQueryParams() {
        return this.state.getQueryParams();
    }

    public setQueryParams(queryParams: ProcessoParams) {
        this.state.setQueryParams(queryParams);
    }
}
