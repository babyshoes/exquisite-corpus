import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';

import { Poems } from '../../../both/collections/poems.collection';
import { PoemFilter } from '../../../both/filters/poem-filter';
import { Options } from '../../../both/filters/pagination';

Meteor.publish('poems', function(options: Options, filter?: PoemFilter) {
    // Publish total count
    Counts.publish(
        this,
        'numberOfPoems',
        Poems.collection.find(buildQuery.call(this, filter)),
        { noReady: true });

    // Return filtered poems
    return Poems.find(buildQuery.call(this, filter), options);
});

function buildQuery(filter?: PoemFilter): Object {
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

    let query: any = baseQuery;

    // Apply the optional filters
    if (filter) {
        if (filter.poemId) {
            query = { $and: [{ _id: filter.poemId }, baseQuery ] };
        }

        if (filter.userId) {
            query = { $and: [
                { "lines.contributorId": filter.userId },
                baseQuery ] };
        }
    }

    return query;
}