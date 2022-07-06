import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemingService {

  constructor() {
  }

  public setCssRootVariable(name: string, value: string) {
    const root = document.documentElement;
    name = name.startsWith('--') ? name : `--${name}`;
    root.style.setProperty(name, value);
  }

}
