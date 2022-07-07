export interface IElement {
  name: string;
  symbol: string;
  an: number;
  aw: number;
  grid: number[];
  d: number;
  bp: number;
  mp: number;
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

  an: number;
  aw: number;
  bp: number;
  d: number;
  grid: number[];
  mp: number;
  name: string;
  symbol: string;
}
