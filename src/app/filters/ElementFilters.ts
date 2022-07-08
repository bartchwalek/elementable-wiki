import {ElementFilter} from './ElementFilter';
import {AtomicElement} from '../model/atomic.element';

export class ElementMaxFilter extends ElementFilter<number> {
  private operandValueKey: string;

  protected constructor(maxVal: number, operandValueKey: string) {
    super(maxVal);
    this.operandValueKey = operandValueKey;
  }

  filteringFunction(element: AtomicElement, prevR: boolean | undefined): boolean {
    return element[this.operandValueKey] < this.compareOperand;
  }
}

export class ElementMinFilter extends ElementFilter<number> {
  private operandValueKey: string;

  protected constructor(maxVal: number, operandValueKey: string) {
    super(maxVal);
    this.operandValueKey = operandValueKey;
  }

  filteringFunction(element: AtomicElement, prevR: boolean | undefined): boolean {
    return element[this.operandValueKey] > this.compareOperand;
  }
}

export class ElementAtomicWeightMinimumFilter extends ElementMinFilter {
  constructor(minVal: number) {
    super(minVal, 'aw');
  }
}

export class ElementAtomicWeightMaximumFilter extends ElementMaxFilter {
  constructor(maxVal: number) {
    super(maxVal, 'aw');
  }
}


export class ElementDensityMinimumFilter extends ElementMinFilter {
  constructor(minVal: number) {
    super(minVal, 'd');
  }
}

export class ElementDensityMaximumFilter extends ElementMaxFilter {
  constructor(maxVal: number) {
    super(maxVal, 'd');
  }
}
