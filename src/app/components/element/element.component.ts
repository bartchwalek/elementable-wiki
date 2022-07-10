import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {TableComponent} from '../table/table.component';
import {AtomicElement} from '../../model/atomic.element';
import {ElementStatusService} from "../../services/element-status.service";
import {EElementFilterType, ElementsFilterComponent} from "../elements-filter/elements-filter.component";

export enum EElementViews {
  symbol = 'symbol',
  atomic_number = 'atomic_number',
  atomic_mass = 'atomic_mass'
}

export enum EElementViewType {
  small = 'small',
  full = 'full'
}

export interface IElementAppliedFilter {
  name: string;
  color: string;
  on: boolean;
  filterRefComponent: ElementsFilterComponent;
}

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.sass']
})
export class ElementComponent implements OnInit {

  private el: AtomicElement;
  private appliedFilters: IElementAppliedFilter[] = [];

  public get onFilters(): IElementAppliedFilter[] {
    return this.appliedFilters.filter(v => v.on);
  }

  @Input()
  public set element(e: AtomicElement) {
    if (e) {
      this.el = e;
      this.el.setComponent(this, this.elementRef.nativeElement);
    }
  }

  public get element(): AtomicElement {
    return this.el;
  }

  public addFilter(id: string, color: string, filter: ElementsFilterComponent): void {
    if (!this.appliedFilters.find(v => id === v.name)) {
      this.appliedFilters.push({
        color,
        name: id,
        on: false,
        filterRefComponent: filter
      });
    }
  }

  public setFilterColor(id: string, color: string): void {
    this.appliedFilters.find(v => v.name === id).color = color;
  }

  public filterOn(id: string): void {
    this.appliedFilters.find(v => v.name === id).on = true;
  }

  public filterOff(id: string): void {
    this.appliedFilters.find(v => v.name === id).on = false;
  }

  @Input() public show: string[];

  buildMessage(af: ElementsFilterComponent): string {
    const val = this.element[af.operandKey];
    const meta = af.filterLabel;
    const un = af.unit;
    let msg = meta;
    switch (af.filterType) {
      case EElementFilterType.range:

        msg = `${msg}: ${val} is between ${af.getSubFilter('min').filter.compareOperand} and ${af.getSubFilter('max').filter.compareOperand} ${af.unit}`;
        break;

      case EElementFilterType.select:
        msg = `${msg}: ${val}`;
        break;
    }
    return msg;
  }

  setFilteringMessage(af: IElementAppliedFilter): void {
    // console.log('applied filter', af);
    this.ess.setMessage('main', this.buildMessage(af.filterRefComponent), af.color);
  }

  setStatus(): void {
    this.ess.setElement('main', this.element);
    this.ess.setStatus('main', this.element.name);
  }

  constructor(public parentTable: TableComponent, public elementRef: ElementRef, public ess: ElementStatusService) {
    if (parentTable.show) {
      this.show = parentTable.show;
    }
  }

  ngOnInit(): void {

  }

}
