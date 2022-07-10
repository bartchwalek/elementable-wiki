import {Injectable} from '@angular/core';
import {DataService} from './data.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {AtomicElement, IElement} from '../model/atomic.element';

export const ElementsDataFile: string = 'elements.json';

export interface IElementDefinitions {
  groups: [];
}

export interface IElementsDef {
  definitions: IElementDefinitions;
  elements: IElement[];
}

@Injectable({
  providedIn: 'root'
})
export class ElementsService {

  private elements: BehaviorSubject<AtomicElement[]> = new BehaviorSubject<AtomicElement[]>([]);
  private definitions: BehaviorSubject<IElementDefinitions> = new BehaviorSubject<IElementDefinitions>({} as IElementDefinitions);
  public elements$: Observable<AtomicElement[]> = this.elements.asObservable();
  public definitions$: Observable<IElementDefinitions> = this.definitions.asObservable();

  constructor(private data: DataService) {
    this.data.loadAsset<IElementsDef>(ElementsDataFile).then(d => {
      this.loadDefinitions(d.definitions);
      this.initialize(d.elements);
    });
  }

  private initialize(data: IElement[]): void {
    this.elements.next(data.map((el: IElement) => new AtomicElement(el)));
  }

  private loadDefinitions(data: IElementDefinitions): void {
    this.definitions.next(data);
  }

  public getElements(): Observable<AtomicElement[]> {
    return this.elements$;
  }

  public getDefinitions(): Observable<IElementDefinitions> {
    return this.definitions$;
  }

}
