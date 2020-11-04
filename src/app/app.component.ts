import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AuthActions from './auth/store/auth.actions';
import * as froApp from './store/app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'My-shop-front-end';

  constructor(private store: Store<froApp.AppState>) {}

  ngOnInit() {
    this.store.dispatch(new AuthActions.AutoLogin());
  }
}
