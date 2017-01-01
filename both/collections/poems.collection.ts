import { MongoObservable } from 'meteor-rxjs';

import { Poem, PoemTransform } from '../models/poem.model';

export const Poems = new MongoObservable.Collection<Poem>('poems', {
    transform: PoemTransform
});