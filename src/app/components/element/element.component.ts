import {Component, Input, OnInit} from '@angular/core';
import {TableComponent} from '../table/table.component';
import {IElement} from '../../model/atomic.element';

export enum EElementViews {
  symbol = 'symbol',
  atomic_number = 'atomic_number',
  atomic_mass = 'atomic_mass'
}

export enum EElementViewType {
  small = 'small',
  full = 'full'
}

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.sass']
})
export class ElementComponent implements OnInit {

  @Input() public element: IElement;
  @Input() public show: string[];

  constructor(public parentTable: TableComponent) {
    if (parentTable.show) {
      this.show = parentTable.show;
    }
  }

  ngOnInit(): void {

  }

}
