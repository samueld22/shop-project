import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DropDownDirective } from './shared/dropdown.directive';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromApp from './store/app.reducer';
import { ItemsAndListsComponent } from './items-and-lists/items-and-lists.component';
import { ItemsComponent } from './items-and-lists/items/items.component';
import { ItemComponent } from './items-and-lists/items/item/item.component';
import { ItemsEffects } from './items-and-lists/items/store/items.effects';
import { ListsComponent } from './items-and-lists/lists/lists.component';
import { AuthComponent } from './auth/auth.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AuthEffects } from './auth/store/auth.effects';
import { environment } from 'src/environments/environment';
import { AccountComponent } from './account/account.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { ShoppingListsEffects } from './shared/shopping-list-store/shopping-lists.effects';
import { ListComponent } from './items-and-lists/lists/list/list.component';
import { ListDetailsComponent } from './items-and-lists/lists/list-details/list-details.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    HeaderComponent,
    DropDownDirective,
    ItemComponent,
    ItemsAndListsComponent,
    ListsComponent,
    AuthComponent,
    AccountComponent,
    ListComponent,
    ListDetailsComponent,
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    StoreModule.forRoot(fromApp.appReducer),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    EffectsModule.forRoot([ItemsEffects, AuthEffects, ShoppingListsEffects]),
    CommonModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
