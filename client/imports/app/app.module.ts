import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccountsModule } from 'angular2-meteor-accounts-ui';
import { Ng2PaginationModule } from 'ng2-pagination';

import { AppComponent } from './app.component';
import { routes, ROUTES_PROVIDERS } from './app.routes';
import { VIEWS_DECLARATIONS } from './views';
import { POEMS_DECLARATIONS } from './poems';
import { USERS_DECLARATIONS } from './users';
import { PIPES_DECLARATIONS } from './pipes';
 
@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(routes),
        AccountsModule,
        Ng2PaginationModule
    ],
    declarations: [
        AppComponent,
        ...VIEWS_DECLARATIONS,
        ...POEMS_DECLARATIONS,
        ...USERS_DECLARATIONS,
        ...PIPES_DECLARATIONS
    ],
    providers: [
        ...ROUTES_PROVIDERS
    ],
    bootstrap: [
        AppComponent
    ] 
})
export class AppModule {}