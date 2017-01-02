import { Meteor } from 'meteor/meteor';

import { Poems } from '../../../both/collections/poems.collection';

Meteor.publish('poems', function() {
    return Poems.find(buildQuery.call(this));
});

Meteor.publish('poem', function(poemId: string) {
    return Poems.find(buildQuery.call(this, poemId));
});

function buildQuery(poemId?: string): Object {
    // Base query for poem permissions
    const baseQuery = {
        $or: [{
            // Poem is complete
            isComplete: true
        }, {
            lastContributorId: {
                // Current user is not the last contributor
                $ne: this.userId
            }
        }]
    }

    return poemId
        // Look for a single poem
        ? { $and: [{ _id: poemId }, baseQuery ] }
        // Return all poems that match the base query
        : baseQuery;
}