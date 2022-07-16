import {Component, Input, OnInit} from '@angular/core';
import {ElementsService} from '../../services/elements.service';
import {EElementViews, ElementComponent} from '../element/element.component';
import {AtomicElement} from '../../model/atomic.element';
import {ElementFilteringService} from '../../services/element-filtering.service';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.sass']
})
export class TableComponent implements OnInit {

    public elements: AtomicElement[];
    tid: string;
    public events: any = {
        elementsLoaded: [() => {
            this.elementsAreLoaded = true;
        }]
    };
    public elementsAreLoaded: boolean = false;

    public onEvent(name: string): void {
        if (this.events[name]) {
            this.events[name].forEach(v => v());
        }
    }

    public get awFilterEnabled(): boolean {
        return this.EFS.getFilterState(this.tableId, 'aw.minmax');
    }

    constructor(public eService: ElementsService, private EFS: ElementFilteringService) {
        eService.getElements().subscribe((elements: AtomicElement[]) => {
            if (elements && elements.length > 0) {
                this.elements = elements;
                setTimeout(() => {
                    this.onEvent('elementsLoaded');
                });
            }
        });
    }

    public getElements(): AtomicElement[] {
        return this.elements;
    }

    public forAllElements(fn: (ec: ElementComponent) => any) {
        if (this.elementsAreLoaded) {
            this.elements.forEach(v => {
                fn(v.componentRef);
            });
        } else {
            this.events.elementsLoaded.push(() => {
                this.elements.forEach(v => {
                    fn(v.componentRef);
                });
            });
        }
    }

    public onElementsLoaded(fn: (any?) => any) {
        if (this.elementsAreLoaded) {
            fn();
        } else {
            this.events.elementsLoaded.push(fn);
        }
    }

    @Input() public show: string[] = [EElementViews.symbol, EElementViews.atomic_mass, EElementViews.atomic_number]


    @Input()
    public set tableId(tid: string) {
        if (tid) {
            this.tid = tid;
            this.EFS.registerTable(tid, this);
        }
    }

    public get tableId(): string {
        return this.tid;
    }

    ngOnInit(): void {
    }

}
