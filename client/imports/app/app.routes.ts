import { Route } from '@angular/router';
import { Meteor } from 'meteor/meteor';

import { PoemsListComponent } from './poems/poems-list.component';
import { PoemDetailsComponent } from './poems/poem-details.component';

export const routes: Route[] = [
    // List of all poems
    {
        path: '',
        component: PoemsListComponent
    },
    // Details component for editing or viewing an existing poem
    { 
        path: 'poem/:poemId',
        component: PoemDetailsComponent
    },
    // Details component for creating a new poem
    {
        path: 'poem',
        component: PoemDetailsComponent,
        canActivate: ['canActivateForLoggedIn']
    }
];

export const ROUTES_PROVIDERS = [{
    provide: 'canActivateForLoggedIn',
    useValue: () => !!Meteor.userId()
}];