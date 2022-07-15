import {Component, Input, OnInit} from '@angular/core';
import {ElementFilteringService, ITableFilterConfiguration} from 'src/app/services/element-filtering.service';

@Component({
    selector: 'app-legend',
    templateUrl: './legend.component.html',
    styleUrls: ['./legend.component.sass']
})
export class LegendComponent implements OnInit {

    constructor(public efs: ElementFilteringService) {
    }

    public tRef: ITableFilterConfiguration;

    @Input() set tableId(tid: string) {
        if (tid && this.efs.getTable(tid)) {
            this.tRef = this.efs.getTable(tid);
        }
    };

    ngOnInit(): void {
    }


}
