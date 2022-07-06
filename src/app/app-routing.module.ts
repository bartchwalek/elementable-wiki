import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainPageComponent} from './pages/main-page/main-page.component';
import {SearchPageComponent} from './pages/search-page/search-page.component';
import {MorePageComponent} from './pages/more-page/more-page.component';


const routes: Routes = [
  {path: 'home', component: MainPageComponent},
  {path: 'search', component: SearchPageComponent},
  {path: 'more', component: MorePageComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
