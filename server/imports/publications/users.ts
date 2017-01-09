import { Meteor } from 'meteor/meteor';

import { Poems } from '../../../both/collections/poems.collection';
import { Poem } from '../../../both/models/poem.model';
import { PoemLine } from '../../../both/models/poem-line.model';

Meteor.publish('contributors', function (poemId: string) {
    const poem: Poem = Poems.findOne(poemId);

    const contributorIds: string[] = poem && poem.isComplete
        ? _.map(poem.lines, function (line: PoemLine): string {
            return line.contributorId;
        })
        : [];

    return Meteor.users.find({
        _id: {
            $in: contributorIds
        }
    });
});

Meteor.publish('user', function (userId: string) {
    return Meteor.users.find({
        _id: userId
    });
});