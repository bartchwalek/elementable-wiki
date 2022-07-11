import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.sass']
})
export class MainPageComponent implements OnInit {

  public filters = [];
  public filterTypes: Array<any> = [
    {
      value: 'category',
      label: 'Category',
      count: 0,
      type: 'select',
      id: 'category',
      color: 'lightblue'
    },
    {
      value: 'aw',
      label: 'Atomic Weight',
      count: 0,
      type: 'range',
      id: 'aw.minmax',
      unit: 'g/mol',
      color: 'lightgreen'
    },
    {
      value: 'd',
      label: 'Density',
      count: 0,
      type: 'range',
      id: 'd.minmax',
      options: {
        step: 0.1,
        initialState: {
          lowerBound: 0,
          upperBound: 10
        }
      },
      unit: 'g/cm3',
      color: 'yellow'
    },
    {
      value: 'bp',
      label: 'Boiling Point',
      count: 0,
      type: 'range',
      id: 'bp.minmax',
      options: {
        step: 10,
        initialState: {
          lowerBound: 0,
          upperBound: 100
        }
      },
      unit: 'K',
      color: 'lightgrey'
    },
    {
      value: 'mp',
      label: 'Melting Point',
      count: 0,
      type: 'range',
      id: 'mp.minmax',
      options: {
        step: 10,
        initialState: {
          lowerBound: 0,
          upperBound: 100
        }
      },
      unit: 'K',
      color: 'lightpink'
    }
  ];

  constructor() {
  }

  ngOnInit(): void {
  }


  addFilter(fval: any) {
    console.log('Adding ', fval);
    const ft = this.filterTypes.find(v => v.value === fval);
    if (ft) {
      ft.count++;
      const cop = Object.assign({}, ft);
      this.filters.push(cop);

    }
  }

}
