import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HeaderComponent } from './components/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from '../app-routing.module';
import { ImageApiService } from './services/image-api.service';
import { DurationTimeBySecondsPipe } from './pipes/duration-time-by-seconds.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    DurationTimeBySecondsPipe
  ],
  imports: [
    BrowserModule,
    MatIconModule,
    MatToolbarModule,
    AppRoutingModule,
  ],
  providers: [
    ImageApiService
  ],
  bootstrap: [],
  exports: [
    HeaderComponent,
    DurationTimeBySecondsPipe
  ]
})
export class SharedModule { }
