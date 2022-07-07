import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {ElementFilteringService} from '../../services/element-filtering.service';
import {TableComponent} from '../table/table.component';
import {ElementAtomicWeightMaximumFilter, ElementAtomicWeightMinimumFilter} from '../../filters/ElementFilters';
import {AtomicElement} from '../../model/atomic.element';

@Component({
  selector: 'app-elements-filter',
  templateUrl: './elements-filter.component.html',
  styleUrls: ['./elements-filter.component.sass']
})
export class ElementsFilterComponent implements OnInit {

  private filteredTable: TableComponent;


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
      this.filteringService.registerTable(this.filteredTable.tableId, this.filteredTable);
      this.registerFilters();
    }
  }

  constructor(public filteringService: ElementFilteringService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
  }

  registerFilters(): void {
    this.filteringService.registerFilter(this.filteredTable.tableId, this.awMinFilter.chain(this.awMaxFilter), 'aw.minmax');
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
      this.filteredTable.elements.map(v => v.filters.awInRange = false);
      (fi.filter.filter(this.filteredTable.elements) as AtomicElement[]).map(v => v.filters.awInRange = true);
    });
  }

  updateView(event: any): void {
    this.cdr.detectChanges();
    this.filteringService.setFilterState(this.filteredTable.tableId, 'aw.minmax', event.target.checked);
  }

}
