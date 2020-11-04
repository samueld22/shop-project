import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ShoppingList } from 'src/app/shared/models/shopping-list.model';
import * as fromApp from '../../../store/app.reducer';
import * as ShoppingListActions from '../../../shared/shopping-list-store/shopping-lists.actions';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.component.html',
  styleUrls: ['./list-details.component.css'],
})
export class ListDetailsComponent implements OnInit {
  selectedList: ShoppingList = null;
  renameMode = false;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store.select('lists').subscribe((listsData) => {
      this.selectedList = listsData.selectedList;
    });
  }

  onStartRename() {
    this.renameMode = true;
  }

  onSubmitRename(form: NgForm) {
    this.renameMode = false;
    this.store.dispatch(
      new ShoppingListActions.RenameShoppingList({
        id: this.selectedList._id,
        newName: form.value.name,
      })
    );
    console.log(form.value.name, typeof form.value.name);
  }
}
