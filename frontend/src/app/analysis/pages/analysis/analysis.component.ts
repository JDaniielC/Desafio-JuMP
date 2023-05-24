import { Component, OnDestroy } from '@angular/core';
import { AnalysisFacade } from '../../analysis.facade';
import { Processo } from '../../types/Processo';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss'],
})
export class AnalysisComponent implements OnDestroy {
  selectedMovimento: string = 'Expedição de movimento';
  processoList: Processo[] = [];
  subscription!: Subscription

  constructor(private readonly facade: AnalysisFacade) {
    this.subscription = facade.getProcessoData()
      .subscribe((processoData: Processo[]) => {
        this.processoList = processoData;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
