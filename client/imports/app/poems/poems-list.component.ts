import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { InjectUser } from 'angular2-meteor-accounts-ui';
import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';

import { Poems } from '../../../../both/collections/poems.collection';
import { Poem, PoemPermissions } from '../../../../both/models/poem.model';

import template from './poems-list.component.html';

@Component({
    selector: 'poems-list',
    template
})
@InjectUser('user')
export class PoemsListComponent implements OnInit, OnDestroy {
    poems: Observable<Poem[]>;
    user: Meteor.User;
    poemsSub: Subscription;

    ngOnInit() {
        this.poems = Poems.find({}).zone();
        this.poemsSub = MeteorObservable.subscribe('poems').subscribe();
    }

    ngOnDestroy() {
        this.poemsSub.unsubscribe();
    }

    removePoem(poem: Poem): void {
        Poems.remove(poem._id);
    }

    // Determines if the current user can remove the given poem,
    // using the poem permissions
    currentUserCanRemovePoem(poem: Poem): boolean {
        return Meteor.userId()
            && PoemPermissions.remove(Meteor.userId(), poem);
    }
}