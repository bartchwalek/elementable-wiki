import {Injectable} from '@angular/core';
import {DataService} from './data.service';
import {BehaviorSubject, Observable} from 'rxjs';

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

export const ElementsDataFile: string = 'elements.json';

@Injectable({
  providedIn: 'root'
})
export class ElementsService {

  private elements: BehaviorSubject<IElement[]> = new BehaviorSubject<IElement[]>([]);
  public elements$: Observable<IElement[]> = this.elements.asObservable();

  constructor(private data: DataService) {
    this.data.loadAsset<IElement[]>(ElementsDataFile).then(d => this.initialize(d));
  }

  private initialize(data: IElement[]): void {
    this.elements.next(data);
  }

  public getElements(): Observable<IElement[]> {
    return this.elements$;
  }

}
