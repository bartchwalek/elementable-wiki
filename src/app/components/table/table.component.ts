import { Component, OnInit } from '@angular/core';
import {ElementsService} from '../../services/elements.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent implements OnInit {

  constructor(public eService: ElementsService) { }

  ngOnInit(): void {
  }

}
