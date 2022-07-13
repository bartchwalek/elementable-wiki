import {
  AfterViewInit,
  Component,
  ElementRef, HostListener, Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChange,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {ColorsArray} from "./colors";
import {EComparatorType, ElementCompareFilter, ElementMinFilter} from "../../../filters/ElementFilters";
import {TableComponent} from "../../table/table.component";
import { ElementFilter } from 'src/app/filters/ElementFilter';
import { AtomicElement } from 'src/app/model/atomic.element';

export interface IRangeDivider {
  position: number;
  value: number;
}

export interface IRangeRange {
  start: number;
  stop: number;
  color: string;
}

@Component({
  selector: 'app-range-setter',
  templateUrl: './range-setter.component.html',
  styleUrls: ['./range-setter.component.sass']
})
export class RangeSetterComponent implements OnInit, OnChanges, AfterViewInit {

  constructor(public renderer: Renderer2) {
  }

  public filteredTable: TableComponent;
  public filtersRegistered: boolean = false;

  @Input() set table(ft: TableComponent) {
    if (ft) {
      this.filteredTable = ft;
      this.filteredTable.onElementsLoaded(() => {
        this.registerFilters();
      });
    }
  }
  usedColors = [];
  getRandomColor() {
    let k;
    while(this.usedColors.includes(k)) {
      k = ColorsArray[Math.floor(Math.random()*ColorsArray.length)].code.hex;
    }
    this.usedColors.push(k);
   return k;
  }
  
  c1;
  c2;

  @ViewChild('container') container: ElementRef;

  width: number = 0;
  selected: number = 0;
  curX: number = 0;

  ngAfterViewInit(): void {
    this.init();
  }

  @HostListener('window:resize', ['$event']) onResize(event) {
    this.init();
  }

  init(): void {
    this.width = this.container.nativeElement.offsetWidth;
  }

  range: number;
  minima: number;
  maxima: number;
  ratio: number;

  registerFilters(): void {
    this.c1 = this.getRandomColor();
    this.c2 = this.getRandomColor();
    this.ranges[0].color = this.c1;
    this.ranges[1].color = this.c2;
    if( this.filteredTable.elements.length < 1) return;
    if(this.filtersRegistered) return;
    let min = 0;
    let max = 0;
    this.filteredTable.elements.forEach((v, idx) => {
      if(idx === 0) {
        min = v.aw;
        max = v.aw;
        return;
      }
        if(v.aw > max) {
          max = v.aw;
          return;
        }
        if(v.aw < min) {
          min = v.aw;
        }
    })
    this.minima = min;
    this.maxima = max;
    this.range = (max - min + 2);
    this.ratio = 100 / this.range;
    
    this.addFilter(min, max/2, this.c1, 0);
    this.addFilter(max/2, max+1, this.c2, 1);
    this.filtersRegistered = true;
  }

  public get currentBackground(): string {
    const pos1 = this.dividers[0].position;
    const pos2 = 100;
    return `linear-gradient(to right, red, red ${pos1}%, green ${pos1}%, green ${pos2}%)`;
  }

  public dividers: IRangeDivider[] = [
    {
      position: 50,
      value: 50
    } as IRangeDivider
  ];

  public ranges: IRangeRange[] = [
    {
      start: 0,
      stop: 50,
      color: this.c1
    }, {
      start: 50,
      stop: 100,
      color: this.c2
    },

  ];

  ngOnInit(): void {
  }

  ngOnChanges(c: SimpleChanges): void {

  }

  drag(e: DragEvent): void {
    console.log(e);
  }

  dragStart(e: DragEvent): void {
    console.log(e);
  }

  dragEnd(e: DragEvent): void {
    console.log(e);
  }

  drop(e: DragEvent): boolean {
    e.stopPropagation();
    return false;
  }

  mouseIsDown: boolean = false;

  mousedown(e: MouseEvent, index: number): any {
    //console.log(e);
    this.mouseIsDown = !this.mouseIsDown;
    this.selected = index;
    e.stopPropagation();
    return false;
  }

  filters: {filter: ElementFilter, min: ElementFilter, max: ElementFilter, color: string}[] = [];

  addFilter(min: number, max: number, color: string, idx: number): void {
    let minfilt = new ElementCompareFilter<number>(min, 'aw', EComparatorType.moreThanEqual);
    let maxfilt = new ElementCompareFilter<number>(max, 'aw', EComparatorType.lessThan);
    this.filters.splice(idx, 0, {
      filter: minfilt.chain(maxfilt),
      min: minfilt,
      max: maxfilt,
      color
    })
  }

  update(): void {
    this.filters.forEach(f => {
      let r = f.filter.filter(this.filteredTable.elements) as AtomicElement[];
      r.forEach(v => {
       this.renderer.setStyle(v.componentRef.elementRef.nativeElement, 'background', f.color);
      });
    });
  }

  addDiv(): void {

    let idx = 0;
    const cRange = this.ranges.find((v, i) => {
      if ((this.curX > v.start) && (this.curX < v.stop)) {
        idx = i;
        return true;
      }
      return false;
    });
    if (cRange) {
      cRange.stop = this.curX;
      const before = this.ranges[idx - 1];
      const after = this.ranges[idx + 1];


      const col = this.getRandomColor();
      this.ranges.splice(idx + 1, 0, {
        start: this.curX,
        stop: after ? after.start : 100,
        color: col
      });

      this.addFilter(this.curX / this.ratio, (after ? after.start : 100) / this.ratio, col, idx+1);

      this.dividers.splice(idx, 0, {
        position: this.curX,
        value: 50
      } as IRangeDivider);
      this.update();
    }
  }

  mouseup(e: MouseEvent): any {
    //console.log(e);
    //this.mouseIsDown = false;
  }

  mousemove(e: MouseEvent): any {

    const x = (e.clientX - 30) / this.width * 100;
    console.log(x, x / this.ratio);
    this.curX = x;
    const nextStart = this.ranges[this.selected + 2] ? this.ranges[this.selected + 2].start : 100;
    const prevStop = this.ranges[this.selected - 1] ? this.ranges[this.selected - 1].stop : 0;
    if (this.mouseIsDown && (this.curX > prevStop) && (this.curX < nextStart)) {
      console.log('dragging');

      this.dividers[this.selected].position = x;
      this.ranges[this.selected].stop = x;
      this.ranges[this.selected + 1].start = x;
      this.filters[this.selected].max.with(x / this.ratio);
      this.filters[this.selected + 1].min.with(x / this.ratio);
      this.update();
    }
  }

}
