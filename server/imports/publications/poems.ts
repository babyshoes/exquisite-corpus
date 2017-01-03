import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';

import { Poems } from '../../../both/collections/poems.collection';
import { Options } from '../../../both/filters/pagination';

Meteor.publish('poems', function(options: Options) {
    // Publish total count
    Counts.publish(
        this,
        'numberOfPoems',
        Poems.collection.find(buildQuery.call(this)),
        { noReady: true });

    // Return filtered poems
    return Poems.find(buildQuery.call(this), options);
});

Meteor.publish('poem', function(poemId: string) {
    return Poems.find(buildQuery.call(this, poemId));
});

function buildQuery(poemId?: string): Object {
    const completeQuery = {
        // All users (even anonymous) can see completed poems
        isComplete: true
    };

    // Base query for poem permissions
    const baseQuery = this.userId
        ? { 
            $or: [completeQuery, {
                lastContributorId: {
                    // Logged in users can edit poems for which they're
                    // not the last contributor
                    $ne: this.userId
                }
            }]
        }
        // Anonymous users can only view complete poems
        : completeQuery;

    return poemId
        // Look for a single poem
        ? { $and: [{ _id: poemId }, baseQuery ] }
        // Return all poems that match the base query
        : baseQuery;
}