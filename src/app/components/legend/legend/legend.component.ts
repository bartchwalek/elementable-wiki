import {Component, Input, OnInit} from '@angular/core';
import {
    ElementFilteringService,
    IFilterConfiguration,
    ITableFilterConfiguration
} from 'src/app/services/element-filtering.service';
import {EComparator, ElementsFilterComponent} from '../../elements-filter/elements-filter.component';

@Component({
    selector: 'app-legend',
    templateUrl: './legend.component.html',
    styleUrls: ['./legend.component.sass']
})
export class LegendComponent implements OnInit {

    constructor(public efs: ElementFilteringService) {
    }

    public tRef: ITableFilterConfiguration;
    public tableFilters: IFilterConfiguration[];

    @Input() set tableId(tid: string) {
        if (tid) {
            this.efs.getTable$(tid).then((v: ITableFilterConfiguration) => {
                this.tRef = v;
                console.log('Legend set table: ', this.tRef);
                this.tableFilters = this.efs.getTableFilters(tid);
            });
        }
    }

    ngOnInit(): void {
    }

    getFilterMin(fc: ElementsFilterComponent): string {
        return fc.getComparator('>').value; // .toFixed(2);
    }

    getFilterMax(fc: ElementsFilterComponent): string {
        return fc.getComparator('<').value; // .toFixed(2);
    }


}
