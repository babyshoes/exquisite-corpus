import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Poems } from '../../../../both/collections/poems.collection';
import { Poem } from '../../../../both/models/poem.model';

import template from './poems-list.component.html';

@Component({
    selector: 'poems-list',
    template
})

export class PoemsListComponent {
    poems: Observable<Poem[]>;

    constructor() {
        this.poems = Poems.find({}).zone();
    }

    removePoem(poem: Poem): void {
        Poems.remove(poem._id);
    }
}