import {Injectable} from '@angular/core';
import {TableComponent} from '../components/table/table.component';
import {AtomicElement} from '../model/atomic.element';
import {ElementFilter} from '../filters/ElementFilter';
import {ElementsFilterComponent} from '../components/elements-filter/elements-filter.component';
import {Observable, ReplaySubject} from 'rxjs';
import {filter, first, map} from 'rxjs/operators';

export interface IFilterConfiguration {
    filter: (((e: AtomicElement) => boolean) | ElementFilter) | ElementFilter;
    enabled: boolean;
    name: string;
    filterComponent: ElementsFilterComponent;
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

    public registeredTables: ReplaySubject<[string, ITableFilterConfiguration]> = new ReplaySubject<[string, ITableFilterConfiguration]>();
    public registeredTables$: Observable<[string, ITableFilterConfiguration]> = this.registeredTables.asObservable();

    constructor() {
    }

    public registerTable(referenceName: string, tableRef: TableComponent) {
        const config: ITableFilterConfiguration = {
            table: tableRef,
            filters: []
        } as ITableFilterConfiguration;
        this.tableMap.set(referenceName, config);
        this.registeredTables.next([referenceName, config]);
    }

    public getTable(referenceName: string): ITableFilterConfiguration {
        return this.tableMap.get(referenceName);
    }

    public async getTable$(ref: string): Promise<ITableFilterConfiguration> {
        return this.registeredTables$.pipe(first(v => v[0] === ref), map(v => v[1])).toPromise();
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

    public getTableFilters(tableRefName: string): IFilterConfiguration[] {
        if (this.tableMap.has(tableRefName)) {
            return this.tableMap.get(tableRefName).filters;
        }
    }

    public registerFilter(tableRefName: string, efcRef: ElementsFilterComponent, filter: ElementFilter, name: string);
    public registerFilter(tableRefName: string, efcRef: ElementsFilterComponent,
                          filteringFunction: ((e: AtomicElement) => boolean) | ElementFilter, name: string) {
        if (this.tableMap.has(tableRefName)) {
            this.tableMap.get(tableRefName).filters.push({
                enabled: false,
                filter: filteringFunction,
                filterComponent: efcRef,
                name
            });
        }
    }

}
