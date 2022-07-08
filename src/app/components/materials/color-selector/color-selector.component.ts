import {
  ChangeDetectorRef,
  Component,
  ElementRef, EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';
import {faArrowDown} from '@fortawesome/free-solid-svg-icons';
import {ThemingService} from "../../../services/theming.service";
import {DataService} from "../../../services/data.service";

@Component({
  selector: 'app-color-selector',
  templateUrl: './color-selector.component.html',
  styleUrls: ['./color-selector.component.sass']
})
export class ColorSelectorComponent implements OnInit {

  @Input() colors: string[] = ['red', 'green', 'blue', 'white', 'black', 'magenta', 'cyan', 'yellow', 'lightgreen'];
  @Input() label: string = '';

  @Input() selected: string = 'white';
  @Output() selectedChange = new EventEmitter<string>();

  @Output() public color: string;

  private enableDocumentClickTrigger: boolean = false;

  @Input() set loadJson(f: string) {
    if (f) {
      this.data.loadAsset(`${f}.json`).then((jsonO: any) => {
        this.colors = jsonO.map(v => v.hex);
      });
    }
  };

  @ViewChild('selector') selector: ElementRef;
  @ViewChild('pal') pal: ElementRef;

  @HostListener('document:click', ['$event']) documentClick(event: any) {
    if (this.enableDocumentClickTrigger && !Array.from(event.target.classList).includes('sample')) {
      this.toggle();
    }
  }

  public static MAX_COLS: number = 3;

  faArrowDown = faArrowDown;
  public showPalette: boolean = false;
  public previewed: string = this.selected;

  constructor(public renderer: Renderer2, public cdr: ChangeDetectorRef, public theme: ThemingService, public data: DataService) {
  }

  reposition(): void {

    const cN: number = this.colors.length;
    let rN: number = Math.floor(cN / ColorSelectorComponent.MAX_COLS);
    if (cN % ColorSelectorComponent.MAX_COLS > 0) {
      rN += 1;
    }

    this.theme.setCssRootVariable('--color-selector-rows', rN + '');

    const offset = this.selector.nativeElement.offsetLeft;
    const br = this.selector.nativeElement.getBoundingClientRect();
    console.log(offset);
    this.renderer.setStyle(this.pal.nativeElement, 'left', `${offset}px`);
    this.renderer.setStyle(this.pal.nativeElement, 'width', `${br.width}px`);
  }

  select(val: string): void {
    this.selected = val;
    this.selectedChange.emit(this.selected);
    this.color = val;
    this.toggle();
  }

  preview(val: string): void {
    this.previewed = val;
  }

  toggle(): void {

    this.showPalette = !this.showPalette;
    if (this.showPalette) {
      setTimeout(() => {
        this.enableDocumentClickTrigger = true;
      }, 100);
    } else {
      this.enableDocumentClickTrigger = false;
    }
    setTimeout(() => {
      this.reposition();
      this.cdr.detectChanges();
    });

  }

  ngOnInit(): void {
    this.theme.setCssRootVariable('--color-selector-cols', ColorSelectorComponent.MAX_COLS + '');
  }

}
