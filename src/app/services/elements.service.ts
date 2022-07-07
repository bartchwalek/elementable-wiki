import {Injectable} from '@angular/core';
import {DataService} from './data.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {AtomicElement, IElement} from '../model/atomic.element';

export const ElementsDataFile: string = 'elements.json';

@Injectable({
  providedIn: 'root'
})
export class ElementsService {

  private elements: BehaviorSubject<AtomicElement[]> = new BehaviorSubject<AtomicElement[]>([]);
  public elements$: Observable<AtomicElement[]> = this.elements.asObservable();

  constructor(private data: DataService) {
    this.data.loadAsset<IElement[]>(ElementsDataFile).then(d => this.initialize(d));
  }

  private initialize(data: IElement[]): void {
    this.elements.next(data.map((el: IElement) => new AtomicElement(el)));
  }

  public getElements(): Observable<AtomicElement[]> {
    return this.elements$;
  }

}
