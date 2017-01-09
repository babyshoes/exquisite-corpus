import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';

import 'rxjs/add/operator/map';

import { Users } from '../../../../both/collections/users.collection';
import { User, UserPermissions } from '../../../../both/models/user.model';

import template from './user-profile.component.html';

@Component({
    selector: 'user-profile',
    template
})
export class UserProfileComponent implements OnInit, OnDestroy {
    userId: string;
    user: User;
    userSub: Subscription;
    paramsSub: Subscription;

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        // Get an existing user from the route params
        this.paramsSub = this.route.params
            .map(params => params['userId'])
            .subscribe(userId => {
                this.userId = userId;

                // Subscribe to this user
                if (this.userSub) {
                    this.userSub.unsubscribe();
                }

                this.userSub = MeteorObservable.subscribe('user', this.userId).subscribe(() => {
                    this.user = Users.findOne(this.userId);
                });
            });
    }

    ngOnDestroy() {
        // Clean up the subscriptions when the component is destroyed
        this.paramsSub.unsubscribe();
        this.userSub.unsubscribe();
    }

    saveUser() {
        Users.update(this.user._id, {
            $set: {
                username: this.user.username
            }
        });
    }

    canUpdate() {
        return UserPermissions.update(Meteor.userId(), this.user);
    }
}