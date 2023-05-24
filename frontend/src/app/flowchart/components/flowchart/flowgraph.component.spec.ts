import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowgraphComponent } from './flowgraph.component';

describe('FlowgraphComponent', () => {
  let component: FlowgraphComponent;
  let fixture: ComponentFixture<FlowgraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlowgraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlowgraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
