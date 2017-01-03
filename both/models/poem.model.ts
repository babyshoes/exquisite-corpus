import { Meteor } from 'meteor/meteor';

import { CollectionObject } from './collection-object.model';
import { PoemLine } from './poem-line.model';

export interface Poem extends CollectionObject {
    lines: PoemLine[];
    isComplete: boolean;
    creatorId: string;
    creationDate: Date;
    lastContributorId: string;
    lastModifiedDate: Date;
}

export const PoemPermissions = {
    insert: function (userId: string, poem: Poem) {
        // All authenticated users can add poems
        return !!userId;
    },
    update: function (userId: string, poem: Poem) {
        // Authenticated users who are not the most recent contributor
        // can update poems
        return !!userId
            && poem.lastContributorId !== userId;
    },
    remove: function (userId: string, poem: Poem) {
        // Any contributor can remove the poem
        return !!userId
            && _.any(poem.lines, function (line: PoemLine): boolean {
                return line.contributorId === userId;
            });
    }
};