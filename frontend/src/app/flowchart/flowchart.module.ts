import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { HomeComponent } from './pages/home/home.component';
import { FlowgraphComponent } from './components/flowchart/flowgraph.component';
import { StatisticsComponent } from './components/statistics/statistics.component';

import { FlowchartRoutingModule } from './flowchart-routing.module';
import { FlowchartApi } from './api/flowchart.api';
import { FlowchartFacade } from './flowchart.facade';
import { FlowchartState } from './state/flowchart-state/flowchart.state';
import { flowchartInitializerProvider } from './flowchart.initializer';

import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    HomeComponent,
    FlowgraphComponent,
    StatisticsComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    SharedModule,
    FlowchartRoutingModule,
    MatDividerModule
  ],
  providers: [
    FlowchartApi,
    FlowchartFacade,
    FlowchartState,
    flowchartInitializerProvider
  ]
})
export class FlowchartModule { }
