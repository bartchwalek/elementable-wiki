import {ChangeDetectorRef, Component, Input, OnInit, Renderer2} from '@angular/core';
import {ElementFilteringService} from '../../services/element-filtering.service';
import {TableComponent} from '../table/table.component';
import {ElementAtomicWeightMaximumFilter, ElementAtomicWeightMinimumFilter} from '../../filters/ElementFilters';
import {AtomicElement} from '../../model/atomic.element';
import {ElementComponent} from '../element/element.component';

@Component({
  selector: 'app-elements-filter',
  templateUrl: './elements-filter.component.html',
  styleUrls: ['./elements-filter.component.sass']
})
export class ElementsFilterComponent implements OnInit {

  private filteredTable: TableComponent;

  public _color: string = 'lightgreen';

  public set color(c: string) {
    if (c) {
      this._color = c;
      this.filteredTable.forAllElements((ec: ElementComponent) => {
        ec.setFilterColor('aw.minmax', this._color);
      });
    }
  }

  public get color(): string {
    return this._color;
  }

  public awMinFilter: ElementAtomicWeightMinimumFilter = new ElementAtomicWeightMinimumFilter(0);
  public awMaxFilter: ElementAtomicWeightMaximumFilter = new ElementAtomicWeightMaximumFilter(200);

  private filters = [
    {
      name: 'aw.min',
      filter: this.awMinFilter
    },
    {
      name: 'aw.max',
      filter: this.awMaxFilter
    }
  ]

  @Input() set filterTable(ft: TableComponent) {
    if (ft) {
      this.filteredTable = ft;
      this.filteredTable.onElementsLoaded(() => {
        this.registerFilters();
      });
      this.filteringService.registerTable(this.filteredTable.tableId, this.filteredTable);
    }
  }

  constructor(public filteringService: ElementFilteringService, private cdr: ChangeDetectorRef, public renderer: Renderer2) {
  }

  ngOnInit(): void {
  }

  registerFilters(): void {
    this.filteringService.registerFilter(this.filteredTable.tableId, this.awMinFilter.chain(this.awMaxFilter), 'aw.minmax');
    this.filteredTable.elements.forEach(v => {
      v.componentRef.addFilter('aw.minmax', this.color);
    });
  }

  setFilterValue(category: string, filter: string, event: any): void {
    const fId = `${category}.${filter}`;
    const f = this.filters.find(filt => filt.name === fId);
    if (f) {
      f.filter.with(parseFloat(event.target.value));
      this.filterElements();
    }
  }

  private filterElements(): void {
    this.filters.map(fi => {
      this.filteredTable.elements.map(v => {
        v.filters.awInRange = false;
        v.componentRef.filterOff('aw.minmax');
        // this.renderer.setStyle(v.nativeElement, 'background', 'white');
      });
      (fi.filter.filter(this.filteredTable.elements) as AtomicElement[]).map(v => {
        v.filters.awInRange = true;
        v.componentRef.filterOn('aw.minmax');
        // this.renderer.setStyle(v.nativeElement, 'background', this.color);
      });
    });
  }

  updateView(event: any): void {
    this.cdr.detectChanges();
    this.filteringService.setFilterState(this.filteredTable.tableId, 'aw.minmax', event.target.checked);
  }

}
