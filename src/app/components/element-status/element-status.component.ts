import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ElementStatusService} from '../../services/element-status.service';
import {AtomicElement} from '../../model/atomic.element';

@Component({
  selector: 'app-element-status',
  templateUrl: './element-status.component.html',
  styleUrls: ['./element-status.component.sass']
})
export class ElementStatusComponent implements OnInit, OnChanges {

  @Input() esId: string;

  public message: string = '';
  public secondaryMessage: string = '';
  public secondaryMessageColor: string;
  public element: AtomicElement;

  constructor(public elementStatusService: ElementStatusService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes);
    if (changes.esId) {
      this.elementStatusService.registerComponent(this.esId, this);
    }
  }

  setMessage(msg: string): void {
    this.message = msg;
  }

  setSecondaryMessage(msg: string, color?: string): void {
    this.secondaryMessage = msg;
    this.secondaryMessageColor = color;
  }

  setElement(el: AtomicElement): void {
    this.element = el;
    this.message = '';
    this.secondaryMessage = '';
  }


}
