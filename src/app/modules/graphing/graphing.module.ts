import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphComponent } from './components/graph/graph.component';



@NgModule({
  declarations: [GraphComponent],
  imports: [
    CommonModule
  ],
  exports: [
    GraphComponent
  ]
})
export class GraphingModule { }
