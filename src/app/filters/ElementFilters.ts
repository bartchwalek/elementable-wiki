import {ElementFilter} from './ElementFilter';
import {AtomicElement} from '../model/atomic.element';

export class ElementAtomicWeightMinimumFilter extends ElementFilter<number> {
  constructor(minVal: number) {
    super(minVal);
  }

  filteringFunction(element: AtomicElement, prevR?: boolean): boolean {
    return element.aw > this.compareOperand;
  }
}

export class ElementAtomicWeightMaximumFilter extends ElementFilter<number> {

  constructor(maxVal: number) {
    super(maxVal);
  }

  filteringFunction(element: AtomicElement, prevR?: boolean): boolean {
    return element.aw < this.compareOperand;
  }
}
