import {ElementComponent} from "../components/element/element.component";

export enum EElementCategory {
  metals = 'metals',
  semi_conductors = 'semi_conductors',
  non_metals = 'non_metals',
  inert_gasses = 'inert_gasses',
  lanthanides = 'lanthanides'
}

export interface IElement {
  name: string;
  symbol: string;
  an: number;
  aw: number;
  grid: number[];
  d: number;
  bp: number;
  mp: number;
  category: EElementCategory;
}

export class AtomicElement implements IElement {
  constructor(el?: IElement) {
    if (el) {
      Object.assign(this, {}, el);
    }
  }

  filters: { awInRange: boolean } = {
    awInRange: true
  };

  setComponent(ec: ElementComponent, nativeElement: any) {
    this.componentRef = ec;
    this.nativeElement = nativeElement;
  }

  componentRef: ElementComponent;
  nativeElement: any;
  an: number;
  aw: number;
  bp: number;
  d: number;
  grid: number[];
  mp: number;
  name: string;
  symbol: string;
  category: EElementCategory;
}
