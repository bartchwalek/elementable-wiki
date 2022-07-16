/* tslint:disable:no-string-literal */
import {
    AfterViewInit,
    Component,
    ElementRef,
    HostBinding,
    HostListener,
    Input,
    OnInit,
    Renderer2,
    ViewChild
} from '@angular/core';
import {faArrows} from '@fortawesome/free-solid-svg-icons';

export enum EDraggableMovementType {
    hv = 'hv', 'h' = 'h', v = 'v'
}

@Component({
    selector: 'app-draggable-panel',
    templateUrl: './draggable-panel.component.html',
    styleUrls: ['./draggable-panel.component.sass'],
    // tslint:disable-next-line:no-host-metadata-property
    host: {
        '[attr.test]': 'attrProperty'
    }
})
export class DraggablePanelComponent implements OnInit, AfterViewInit {

    constructor(public el: ElementRef, public renderer: Renderer2) {
        document.addEventListener('dragover', (e: DragEvent) => {
            // e = e || window.event;
            if (!this.itemIsDragging) {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
                return false;
            }
            // tslint:disable-next-line:one-variable-per-declaration
            const dragX = e.pageX, dragY = e.pageY;
            // console.log(e);
            // console.log("drag", dragX);
            // tslint:disable-next-line:no-unused-expression
            this.moveX && this.renderer.setStyle(el.nativeElement, 'left', (dragX - this.icoOffset.x - this.icoOffset.shiftX) + 'px');
            // tslint:disable-next-line:no-unused-expression
            this.moveY && this.renderer.setStyle(el.nativeElement, 'top', (dragY - this.icoOffset.y - this.icoOffset.shiftY) + 'px');
            e.preventDefault();
            // Set the dropEffect to move
            e.dataTransfer.dropEffect = 'move';
        });
        document.addEventListener('dragleave', (ev: DragEvent) => {
            ev.preventDefault();
        });
        document.addEventListener('dragenter', (ev: DragEvent) => {
            this.currentDraggingId = window['currentDraggingItem']; // ev.dataTransfer.getData('text');
            this.itemIsDragging = this.currentDraggingId === this.itemId;
            ev.preventDefault();
            return false;
        });
    }

    @Input()
    public set type(t: EDraggableMovementType) {
        if (t) {
            switch (t) {
                case EDraggableMovementType.h:
                    this.moveX = true;
                    this.moveY = false;
                    break;

                case EDraggableMovementType.v:
                    this.moveX = false;
                    this.moveY = true;
                    break;

                case EDraggableMovementType.hv:
                    this.moveX = true;
                    this.moveY = true;
                    break;
            }
        }
    }

    ico = faArrows;
    isDragging = false;

    icoOffset = {
        x: 0,
        y: 0,
        shiftX: 0,
        shiftY: 0
    };
    moveX = true;
    moveY = true;
    itemId = Math.floor(Math.random() * 10000000) + '';
    currentDraggingId = '';
    itemIsDragging = false;

    @ViewChild('dIcon', {read: ElementRef}) dIcon: ElementRef;

    @Input() public title = '';
    attrProperty: any = 'Test';

    @HostListener('window:resize', ['$event']) wResize(e: Event) {
        this.init();
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.init();
        });
    }

    init() {
        if (this.dIcon) {
            const ico = this.dIcon.nativeElement;
            const pan = this.el.nativeElement;

            const icoB = ico.getBoundingClientRect();
            const panB = pan.getBoundingClientRect();

            this.icoOffset.x = icoB.x - panB.x;
            this.icoOffset.y = icoB.y - panB.y;

        }

    }

    // @HostBinding('attr.draggable') draggable: boolean = true;

    ngOnInit(): void {

    }

    dragStart(ev: DragEvent): boolean {
        this.isDragging = true;
        // ev.dataTransfer.setData('text', this.itemId);
        window['currentDraggingItem'] = this.itemId;
        ev.dataTransfer.effectAllowed = 'all';
        return true;
    }

    drag(e: DragEvent): void {
        // const drag_icon = document.createElement('div');
        // drag_icon.className = 'drag-icon';
        // drag_icon.style.position = 'absolute';
        // drag_icon.style.top = '-100px';
        // drag_icon.style.right = '0px';
        // document.body.appendChild(drag_icon);
        // e.dataTransfer.setDragImage(drag_icon, 0, 0);
        if (this.isDragging) {
        }
    }

    dragEnd(e: DragEvent): void {
        this.isDragging = false;
    }

    mdown(event: MouseEvent): void {
        const br = this.dIcon.nativeElement.getBoundingClientRect();
        this.icoOffset.shiftX = event.clientX - br.left;
        this.icoOffset.shiftY = event.clientY - br.top;
    }

    drop(e: DragEvent): void {

    }

}
