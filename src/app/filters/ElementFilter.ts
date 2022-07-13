import {AtomicElement} from '../model/atomic.element';

export enum ECombinationType {
  and = 'and',
  or = 'or'
}

export abstract class ElementFilter<T = any> {
  private next: { filter: ElementFilter<any>, combination: ECombinationType };
  private previous: { filter: ElementFilter<any>, combination: ECombinationType };

  public compareOperand: T;
  

  public with(compareValue: T): ElementFilter {
    this.compareOperand = compareValue;
    return this;
  }

  public abstract filteringFunction(element: AtomicElement, prevR?: boolean): boolean;

  public filter(element: AtomicElement | AtomicElement[], prevR?: boolean, forward: boolean = false): boolean | AtomicElement[] {

    if (Array.isArray(element)) {
      return element.filter((el) => {
        return this.filter(el, prevR, forward);
      });
    }
    if (!forward && this.previous) {
      const ref = this.previous.filter;
      return ref.filter(element, undefined, forward);
    }
    const res = this.filteringFunction(element);
    if (this.next) {
      switch (this.next.combination) {
        case ECombinationType.or:
          return res || this.next.filter.filter(element, res, true);


        case ECombinationType.and:
          return res && this.next.filter.filter(element, res, true);
        default:
          break;
      }
    }
    return res;
  }

  public chain(filter: ElementFilter, combination: ECombinationType = ECombinationType.and): ElementFilter {
    this.next = {filter, combination};
    filter.previous = {filter: this, combination};
    return filter;
  }

  protected constructor(defaultOperand?: T, fn?: ((ae: AtomicElement) => boolean)) {
    if (defaultOperand) {
      this.with(defaultOperand);
    }
    if (fn && typeof fn === 'function') {
      this.filteringFunction = fn;
    }
  }
}
