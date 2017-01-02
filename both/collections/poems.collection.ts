import { MongoObservable } from 'meteor-rxjs';
import { Meteor } from 'meteor/meteor';

import { Poem, PoemTransform, PoemPermissions } from '../models/poem.model';
import { PoemLine } from '../models/poem-line.model';

export const Poems = new MongoObservable.Collection<Poem>('poems', {
    transform: PoemTransform
});

Poems.allow(PoemPermissions);