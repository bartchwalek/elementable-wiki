import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ElementComponent} from './components/element/element.component';
import {TableComponent} from './components/table/table.component';
import {MainPageComponent} from './pages/main-page/main-page.component';
import {MenuComponent} from './components/menu/menu.component';
import {SearchPageComponent} from './pages/search-page/search-page.component';
import {MorePageComponent} from './pages/more-page/more-page.component';
import {HttpClientModule} from '@angular/common/http';
import {ElementsFilterComponent} from './components/elements-filter/elements-filter.component';
import {ColorSelectorComponent} from './components/materials/color-selector/color-selector.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ElementStatusComponent} from './components/element-status/element-status.component';
import {ElementCardComponent} from './components/element-card/element-card.component';
import { RangeSetterComponent } from './components/materials/range-setter/range-setter.component';
import { LegendComponent } from './components/legend/legend/legend.component';
import { DraggablePanelComponent } from './components/materials/draggable-panel/draggable-panel/draggable-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    ElementComponent,
    TableComponent,
    MainPageComponent,
    MenuComponent,
    SearchPageComponent,
    MorePageComponent,
    ElementsFilterComponent,
    ColorSelectorComponent,
    ElementStatusComponent,
    ElementCardComponent,
    RangeSetterComponent,
    LegendComponent,
    DraggablePanelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
