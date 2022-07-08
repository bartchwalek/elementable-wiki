import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {TableComponent} from '../table/table.component';
import {AtomicElement, IElement} from '../../model/atomic.element';

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

  public addFilter(id: string, color: string): void {
    if (!this.appliedFilters.find(v => id === v.name)) {
      this.appliedFilters.push({
        color,
        name: id,
        on: false
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

  constructor(public parentTable: TableComponent, public elementRef: ElementRef) {
    if (parentTable.show) {
      this.show = parentTable.show;
    }
  }

  ngOnInit(): void {

  }

}
