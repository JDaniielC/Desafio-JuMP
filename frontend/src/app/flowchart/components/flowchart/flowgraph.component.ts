import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Input,
} from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import * as d3 from 'd3';
import * as svgPanZoom from 'svg-pan-zoom';

@Component({
  selector: 'app-flowgraph',
  templateUrl: './flowgraph.component.html',
  styleUrls: ['./flowgraph.component.scss'],
})
export class FlowgraphComponent implements AfterViewInit {
  @ViewChild('graph', { static: false }) graph!: ElementRef;
  @Input() graphSource!: SafeHtml;
  interval!: NodeJS.Timeout;

  constructor() {}

  ngAfterViewInit(): void {
    this.interval = setInterval(() => {
      const svgElement = this.graph.nativeElement.querySelector('svg');
      if (this.graph && svgElement) {
        this.modifyGraph();
        this.renderSvgPanZoom(svgElement);
        clearInterval(this.interval);
      }
    }, 1000);
  }

  renderSvgPanZoom(svgElement: SVGElement) {
    svgPanZoom(svgElement as SVGElement, {
      zoomEnabled: true,
      controlIconsEnabled: true,
      fit: true,
      minZoom: 0,
      center: true,
      dblClickZoomEnabled: false,
    });
    svgElement.style.width = '100%';
    svgElement.style.height = '100%';

    const controls = svgElement.querySelector(
      '#svg-pan-zoom-controls'
    ) as HTMLElement;
    controls.style.transform = 'translate(5px, 10px) scale(0.6)';
  }

  modifyGraph() {
    let graph = d3.select('.image-container').select('svg').select('.graph');
    let nodes = graph.selectAll('g.node');
    let nodesContent = nodes.select('g').select('a').select('text');

    nodesContent.each(function () {
      let x: number = Number(d3.select(this).attr('x'));
      let y: number = Number(d3.select(this).attr('y'));
      let infoSvg = nodes.append('g');

      infoSvg
        .append('circle')
        .attr('cx', x - 60)
        .attr('cy', y + 5)
        .attr('r', 10)
        .style('fill', 'blue')
        .attr('stroke', 'white')
        .attr('stroke-width', 2);

      infoSvg
        .append('text')
        .text('i')
        .attr('x', x - 60)
        .attr('y', y + 6)
        .attr('fill', 'white')
        .attr('font-size', 16)
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'middle');
    });
  }
}
