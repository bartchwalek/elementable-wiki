import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ElementComponent } from './components/element/element.component';
import { TableComponent } from './components/table/table.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { MenuComponent } from './components/menu/menu.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { MorePageComponent } from './pages/more-page/more-page.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ElementComponent,
    TableComponent,
    MainPageComponent,
    MenuComponent,
    SearchPageComponent,
    MorePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
