import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  error = null;
  errorSub: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    this.store.dispatch(new AuthActions.LoginStart({ email, password }));
    this.errorSub = this.store.select('auth').subscribe((authState) => {
      if (authState.authError) {
        this.error = authState.authError;
      } else {
        this.error = null;
      }
    });
    form.reset();
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    if (this.errorSub) {
      this.errorSub.unsubscribe();
    }
  }
}
