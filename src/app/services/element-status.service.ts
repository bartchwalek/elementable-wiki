import {Injectable} from '@angular/core';
import {ElementStatusComponent} from '../components/element-status/element-status.component';
import {AtomicElement} from "../model/atomic.element";

@Injectable({
  providedIn: 'root'
})
export class ElementStatusService {

  private registered: Map<string, ElementStatusComponent[]> = new Map<string, ElementStatusComponent[]>();

  constructor() {
  }

  registerComponent(id: string, comp: ElementStatusComponent): void {
    if (!this.registered.get(id)) {
      this.registered.set(id, []);
    }
    this.registered.get(id).push(comp);
  }

  setStatus(id: string, status: string) {
    if (this.registered.has(id)) {
      this.registered.get(id).forEach((comp: ElementStatusComponent) => {
        comp.setMessage(status);
      });
    }
  }

  setMessage(id: string, message: string, color?: string) {
    if (this.registered.has(id)) {
      this.registered.get(id).forEach((comp: ElementStatusComponent) => {
        comp.setSecondaryMessage(message, color);
      });
    }
  }

  setElement(id: string, element: AtomicElement) {
    if (this.registered.has(id)) {
      this.registered.get(id).forEach((comp: ElementStatusComponent) => {
        comp.setElement(element);
      });
    }
  }

}
