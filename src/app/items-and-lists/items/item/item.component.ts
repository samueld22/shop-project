import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../../../shared/models/item.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  @Input() item: Item;
  @Input() index: number;
  isSelected = false;

  ngOnInit(): void {}

  onSelect() {
    console.log(this.item);
    this.isSelected = !this.isSelected;
    if (this.isSelected) {
      //Add item to selected items
    } else {
      //Look through selected items and take away item
    }
  }
}
