import { Component } from '@angular/core';
import { Meteor } from 'meteor/meteor';
import { InjectUser } from 'angular2-meteor-accounts-ui';

import template from './home.component.html';

@Component({
    selector: 'home',
    template
})
@InjectUser('user')
export class HomeComponent {
    user: Meteor.User;
}