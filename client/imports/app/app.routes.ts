import { Route } from '@angular/router';
import { Meteor } from 'meteor/meteor';

import { HomeComponent } from './views/home.component';
import { PoemDetailsComponent } from './poems/poem-details.component';
import { UserProfileComponent } from './users/user-profile.component';

export const routes: Route[] = [
    // Home page with a list of all poems
    {
        path: '',
        component: HomeComponent
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
    },
    // User profile component
    {
        path: 'user/:userId',
        component: UserProfileComponent
    }
];

export const ROUTES_PROVIDERS = [{
    provide: 'canActivateForLoggedIn',
    useValue: () => !!Meteor.userId()
}];