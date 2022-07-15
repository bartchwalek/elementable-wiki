import {ChangeDetectorRef, Component, Input, OnInit, Renderer2} from '@angular/core';
import {ElementFilteringService} from '../../services/element-filtering.service';
import {TableComponent} from '../table/table.component';
import {
  ElementAtomicWeightMaximumFilter,
  ElementAtomicWeightMinimumFilter, ElementCompareFilter, ElementMaxFilter,
  ElementMinFilter
} from '../../filters/ElementFilters';
import {AtomicElement} from '../../model/atomic.element';
import {ElementComponent} from '../element/element.component';

export enum EElementFilterType {
  range = 'range',
  select = 'select'
}

export interface IElementFilterOptions {
  min?: number;
  max?: number;
  step?: number;
  numSteps?: number;
  initialState?: {
    lowerBound?: number;
    upperBound?: number;
  };
}

const defaultElementFilterOptionsRange: IElementFilterOptions = {
  min: 0,
  max: 200,
  step: 1,
  numSteps: 100,
  initialState: {
    // lowerBound: 10,
    // upperBound: 180
  }
};

@Component({
  selector: 'app-elements-filter',
  templateUrl: './elements-filter.component.html',
  styleUrls: ['./elements-filter.component.sass']
})
export class ElementsFilterComponent implements OnInit {

  private filteredTable: TableComponent;

  public _color: string = 'lightgreen';

  public hasPresetRange: boolean = false;

  @Input() public unit: string;

  @Input()
  public set color(c: string) {
    if (c) {
      this._color = c;
      this.onFilteredTableLoaded(() => {
        this.onFiltersRegistered(() => {
          this.filteredTable.forAllElements((ec: ElementComponent) => {
            ec.setFilterColor(this.filterId, this._color);
          });
        });
      });
    }
  }

  public get color(): string {
    return this._color;
  }

  // public awMinFilter: ElementAtomicWeightMinimumFilter = new ElementAtomicWeightMinimumFilter(0);
  // public awMaxFilter: ElementAtomicWeightMaximumFilter = new ElementAtomicWeightMaximumFilter(200);

  private filters = [
    // {
    //   name: 'aw.min',
    //   filter: this.awMinFilter
    // },
    // {
    //   name: 'aw.max',
    //   filter: this.awMaxFilter
    // }
  ];

  private events: any = {
    filteredTableLoaded: [() => {
      this.ftL = true;
    }],
    filtersRegistered: [() => {
      this.fR = true;
    }],
    init: [() => {
      this.init = true;
    }],
    filterOptionsSet: [() => {
      this.filterOptionsSet = true;
    }]
  };

  private ftL: boolean = false;
  private fR: boolean = false;
  private init: boolean = false;
  private filterOptionsSet: boolean = false;

  private onFilteredTableLoaded(fn: (any?) => any): void {
    if (this.ftL) {
      return fn();
    }
    this.events.filteredTableLoaded.push(fn);
  }

  private filteredTableLoaded(): void {
    this.events.filteredTableLoaded.forEach(v => v());
  }

  private onInit(): void {
    this.events.init.forEach(v => v());
  }

  private onFilterOptionsSet(): void {
    this.events.filterOptionsSet.forEach(v => v());
  }

  private onFiltersRegistered(fn: (any?) => any): void {
    if (this.fR) {
      return fn();
    }
    this.events.filtersRegistered.push(fn);
  }

  private afterInit(fn: (any?) => any, once: boolean = true): void {
    if (this.init) {
      return fn();
    }
    const idx = this.events.init.length;
    this.events.init.push(once ? () => {
      this.events.init.splice(idx, 1);
      fn();
    } : fn);
  }

  private afterFilterOptionsSet(fn: (any?) => any, once: boolean = true): void {
    if (this.filterOptionsSet) {
      return fn();
    }
    const idx = this.events.filterOptionsSet.length;
    this.events.filterOptionsSet.push(once ? () => {
      this.events.filterOptionsSet.splice(idx, 1);
      fn();
    } : fn);
  }

  private filtersRegistered(): void {
    this.events.filtersRegistered.forEach(v => v());
  }

  private subFilters = [];

  public getSubFilter(name: string) {
    return this.subFilters.find(v => v.name === name);
  }

  @Input() set filterTable(ft: TableComponent) {
    if (ft) {
      this.filteredTable = ft;
      this.filteredTableLoaded();
      this.filteredTable.onElementsLoaded(() => {
        this.registerFilters();
      });
      this.filteringService.registerTable(this.filteredTable.tableId, this.filteredTable);
    }
  }

  @Input() filterId: string;

  @Input() filterType: EElementFilterType | string;

  private _fo: IElementFilterOptions;

  @Input() set filterOptions(fo: IElementFilterOptions) {
    if (fo) {
      this._fo = fo;
      this.onFilterOptionsSet();
      return;
    }
    setTimeout(() => {
      if (this._fo === undefined) {
        this._fo = {};
        this.onFilterOptionsSet();
      }
    }, 1000);
  }

  get filterOptions(): IElementFilterOptions {
    return this._fo;
  }

  @Input() operandKey: string;

  @Input() filterLabel: string;

  public options: Set<any> = new Set<any>();

  constructor(public filteringService: ElementFilteringService, private cdr: ChangeDetectorRef, public renderer: Renderer2) {
  }

  ngOnInit(): void {
    switch (this.filterType) {
      case EElementFilterType.select:

        const sFilt = new ElementCompareFilter<string>('', this.operandKey);
        this.filters.push({
          name: this.filterId,
          filter: sFilt
        });
        this.subFilters.push({
          name: 'compare',
          filter: sFilt
        });

        this.onFilteredTableLoaded(() => {
          this.onFiltersRegistered(() => {

            this.filteredTable.elements.forEach(el => {
              this.options.add(el[this.operandKey]);
            });
            if (this.options.size > 0) {
              this.setFilterValue('compare', this.options.values().next().value, false);
            }
          });
        });
        this.onInit();

        break;

      default:
      case EElementFilterType.range:
        this.afterFilterOptionsSet(() => {
          if (this.filterOptions.min !== undefined && this.filterOptions.max !== undefined) {
            this.hasPresetRange = true;
          }

          const def = Object.create(defaultElementFilterOptionsRange);
          this.filterOptions = Object.assign({}, def, this.filterOptions);
          const min = new ElementMinFilter(this.filterOptions.min, this.operandKey);
          const max = new ElementMaxFilter(this.filterOptions.max, this.operandKey);
          this.subFilters.push({
            name: 'min',
            filter: min
          });
          this.subFilters.push({
            name: 'max',
            filter: max
          });
          this.filters.push({
            name: this.filterId,
            filter: min.chain(max)
          });
          this.onFilteredTableLoaded(() => {
            this.onFiltersRegistered(() => {

              if (!this.hasPresetRange) { // try to find and apply the range give the set of elements.
                let minVal: number;
                let maxVal: number;
                this.filteredTable.elements.forEach((v: AtomicElement) => {
                  if (minVal === undefined) {
                    minVal = v[this.operandKey];
                    maxVal = minVal;
                    return;
                  }
                  const o = v[this.operandKey];
                  if (o > maxVal) {
                    return maxVal = o;
                  }
                  if (o < minVal) {
                    return minVal = o;
                  }
                });
                const sDiv = this.filterOptions.numSteps || defaultElementFilterOptionsRange.numSteps;
                this.filterOptions.step = (maxVal - minVal) / sDiv;
                this.filterOptions.max = maxVal + this.filterOptions.step;
                this.filterOptions.min = minVal - this.filterOptions.step;
                if (!this.filterOptions.initialState) {
                  this.filterOptions.initialState = {};
                }
                this.filterOptions.initialState.lowerBound =
                  this.filterOptions.initialState.lowerBound === undefined ? this.filterOptions.min : this.filterOptions.initialState.lowerBound;
                this.filterOptions.initialState.upperBound =
                  this.filterOptions.initialState.upperBound === undefined ? this.filterOptions.max : this.filterOptions.initialState.upperBound;
                this.setFilterValue('min', this.filterOptions.initialState.lowerBound, false);
                this.setFilterValue('max', this.filterOptions.initialState.upperBound, false);
              }
            });
          });
          this.onInit();
        });

        break;
    }
  }

  registerFilters(): void {
    this.afterInit(() => {
      this.filteringService.registerFilter(this.filteredTable.tableId, this, this.filters[0].filter, this.filterId);
      this.filteredTable.elements.forEach(v => {
        v.componentRef.addFilter(this.filterId, this.color, this);
      });
      this.filtersRegistered();
    });
  }

  _setFilterValue(category: string, filter: string, event: any): void {
    const fId = `${category}.${filter}`;
    const f = this.filters.find(filt => filt.name === fId);
    if (f) {
      f.filter.with(parseFloat(event.target.value));
      this.filterElements();
    }
  }

  setFilterValue(filter: string, event: any, filterElements: boolean = true): void {
    // const fId = `${category}.${filter}`;

    if (!event.target) {
      const val = event;
      event = {};
      event.target = {
        value: val
      };
    }

    const f = this.subFilters.find(filt => filt.name === filter);
    if (f) {
      switch (this.filterType) {
        case EElementFilterType.select:
          f.filter.with(event.target.value);
          break;
        default:
        case EElementFilterType.range:
          f.filter.with(parseFloat(event.target.value));
          break;
      }

      // tslint:disable-next-line:no-unused-expression
      filterElements && this.filterElements();
    }
  }

  private filterOff(): void {
    this.filteredTable.elements.map(v => {
      v.componentRef.filterOff(this.filterId);
      // this.renderer.setStyle(v.nativeElement, 'background', 'white');
    });
  }

  private filterElements(): void {
    this.filterOff();
    this.filters.map(fi => {
      (fi.filter.filter(this.filteredTable.elements) as AtomicElement[]).map(v => {
        v.componentRef.filterOn(this.filterId);
        // this.renderer.setStyle(v.nativeElement, 'background', this.color);
      });
    });
  }

  updateView(event: any): void {
    this.cdr.detectChanges();
    this.filteringService.setFilterState(this.filteredTable.tableId, this.filterId, event.target.checked);
    if (!event.target.checked) {
      this.filterOff();
    } else {
      this.filterElements();
    }
  }

}
