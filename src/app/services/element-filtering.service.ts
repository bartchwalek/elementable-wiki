import {Injectable} from '@angular/core';
import {TableComponent} from '../components/table/table.component';
import {AtomicElement} from '../model/atomic.element';
import {ElementFilter} from '../filters/ElementFilter';

export interface IFilterConfiguration {
  filter: (((e: AtomicElement) => boolean) | ElementFilter);
  enabled: boolean;
  name: string;
}

export interface ITableFilterConfiguration {
  table: TableComponent;
  filters: IFilterConfiguration[];
}

@Injectable({
  providedIn: 'root'
})
export class ElementFilteringService {

  public tableMap: Map<string, ITableFilterConfiguration> = new Map<string, ITableFilterConfiguration>();

  constructor() {
  }

  public registerTable(referenceName: string, tableRef: TableComponent) {
    this.tableMap.set(referenceName, {
      table: tableRef,
      filters: []
    } as ITableFilterConfiguration);
  }

  public enableFilter(referenceTable: string, referenceFilter: string) {
    this.setFilterState(referenceTable, referenceFilter, true);
  }

  public disableFilter(referenceTable: string, referenceFilter: string) {
    this.setFilterState(referenceTable, referenceFilter, false);
  }

  public getFilterState(referenceTable: string, referenceFilter: string) {
    if (this.tableMap.has(referenceTable)) {
      const filt = this.tableMap.get(referenceTable).filters.find(f => f.name === referenceFilter);
      if (filt) {
        return filt.enabled;
      }
    }
    return undefined;
  }

  public setFilterState(referenceTable: string, referenceFilter: string, state: boolean) {
    if (this.tableMap.has(referenceTable)) {
      const filt = this.tableMap.get(referenceTable).filters.find(f => f.name === referenceFilter);
      if (filt) {
        filt.enabled = state;
      }
    }
  }

  public registerFilter(tableRefName: string, filter: ElementFilter, name: string);
  public registerFilter(tableRefName: string, filteringFunction: ((e: AtomicElement) => boolean) | ElementFilter, name: string) {
    if (this.tableMap.has(tableRefName)) {
      this.tableMap.get(tableRefName).filters.push({
        enabled: false,
        filter: filteringFunction,
        name
      });
    }
  }

}