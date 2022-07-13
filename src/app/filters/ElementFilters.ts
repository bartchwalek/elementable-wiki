import {ElementFilter} from './ElementFilter';
import {AtomicElement} from '../model/atomic.element';

export enum EComparatorType {
  equal = '==',
  lessThan = '<',
  moreThan = '>',
  moreThanEqual = '>='
}

export class ElementCompareFilter<T> extends ElementFilter<T> {
  private operandValueKey: string;
  private comparator: EComparatorType;

  public constructor(operand: T, operandValueKey: string, comparator: EComparatorType = EComparatorType.equal) {
    super(operand);
    this.operandValueKey = operandValueKey;
    this.comparator = comparator;
  }

  
  public setOperandValueKey(key: string): void {
    this.operandValueKey = key;
  }

  filteringFunction(element: AtomicElement, prevR: boolean | undefined): boolean {
    // tslint:disable-next-line:no-eval
    return eval(`element[this.operandValueKey]${this.comparator}this.compareOperand`);


  }

}

export class ElementMaxFilter extends ElementFilter<number> {
  private operandValueKey: string;

  public constructor(maxVal: number, operandValueKey: string) {
    super(maxVal);
    this.operandValueKey = operandValueKey;
  }

  filteringFunction(element: AtomicElement, prevR: boolean | undefined): boolean {
    return element[this.operandValueKey] < this.compareOperand;
  }
}

export class ElementMinFilter extends ElementFilter<number> {
  private operandValueKey: string;

  public constructor(maxVal: number, operandValueKey: string) {
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
