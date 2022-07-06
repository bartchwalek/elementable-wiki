import {Component} from '@angular/core';
import {ThemingService} from './services/theming.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'elementable';

  constructor(private themingService: ThemingService) {
    setTimeout(() => {
      this.themingService.setCssRootVariable('main-bg-color', 'rgba(255,255,255,1)');
    }, 1000);
  }

}
