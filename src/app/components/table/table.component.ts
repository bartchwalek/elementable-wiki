import {Component, Input, OnInit} from '@angular/core';
import {ElementsService} from '../../services/elements.service';
import {EElementViews} from '../element/element.component';
import {AtomicElement} from '../../model/atomic.element';
import {ElementFilteringService} from '../../services/element-filtering.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent implements OnInit {

  public elements: AtomicElement[];

  public get awFilterEnabled(): boolean {
    return this.EFS.getFilterState(this.tableId, 'aw.minmax');
  }

  constructor(public eService: ElementsService, private EFS: ElementFilteringService) {
    eService.getElements().subscribe((elements: AtomicElement[]) => {
      this.elements = elements;
    });
  }

  public getElements(): AtomicElement[] {
    return this.elements;
  }

  @Input() public show: string[] = [EElementViews.symbol, EElementViews.atomic_mass, EElementViews.atomic_number]

  @Input() public tableId: string;

  ngOnInit(): void {
  }

}
