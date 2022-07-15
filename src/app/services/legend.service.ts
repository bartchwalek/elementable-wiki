import { Injectable } from '@angular/core';
import { ElementsFilterComponent, IElementFilterOptions } from '../components/elements-filter/elements-filter.component';
import { ElementFilter } from '../filters/ElementFilter';

export interface ILegendElement {
  variable?: string;
  units?: string;
  min?: number;
  max?: number;
  label?: string;
  elementFilterRef?: ElementFilter;
  filterOptions?: IElementFilterOptions;
  elementFilterCompRef?: ElementsFilterComponent;
}

@Injectable({
  providedIn: 'root'
})
export class LegendService {


  private _legends: Map<string, ILegendElement> = new Map<string, ILegendElement>();

  public get legends(): [string, ILegendElement][] {
    return Array.from(this._legends.entries());
  }

  public setLegend(id: string, tableId: string) {
  }


  constructor() { }




}
