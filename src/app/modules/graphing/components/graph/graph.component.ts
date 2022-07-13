import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

export enum ECanvasContextTypes {
  twoDimensional = '2d'
}

export type FnAny = (...a?: any[]) => any;

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.sass']
})
export class GraphComponent implements OnInit, AfterViewInit {

  public static CONTEXT_TYPE: ECanvasContextTypes = ECanvasContextTypes.twoDimensional;

  private handlers: string[] = ['contextReady'];
  private states: { [index: string]: boolean } = {};

  private initEvent(h: string): void {
    this.events.set(h, [() => {
      this.states[`is${h}`] = true;
    }]);
    this.states[`is${h}`] = false;
  }

  private initializeHandlers(): void {
    for (const h of this.handlers) {
      this.initEvent(h);
    }
  }

  private getState(event: string): boolean {
    return this.states[`is${event}`];
  }

  private events: Map<string, FnAny[]> = new Map<string, FnAny[]>();

  public on(event: string, callback: FnAny, once: boolean = true): void {
    if (!this.events.has(event)) {
      this.initEvent(event);
    }
    const idx = this.events.get(event).length;
    this.events.get(event).push(once ? () => {
      this.events.get(event).splice(idx, 1);
      callback();
    } : callback);

  }

  private trigger(event: string): void {
    // tslint:disable-next-line:no-unused-expression
    this.events.has(event) && this.events.get(event).forEach(cb => {
      cb();
    });
  }

  private dom: any = {
    canvas: HTMLCanvasElement;
  };

  private gl: any = {
    context: CanvasRenderingContext2D;
  }

  private graphElementRef: ElementRef;

  @ViewChild('graph')
  public set graph(g: ElementRef) {
    if (g) {
      this.graphElementRef = g;
      this.dom.canvas = this.graphElementRef.nativeElement;
      this.gl.context = this.dom.canvas.getContext(GraphComponent.CONTEXT_TYPE);
      this.trigger('contextReady');
    }
  }

  constructor() {
  }

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
  }


}
