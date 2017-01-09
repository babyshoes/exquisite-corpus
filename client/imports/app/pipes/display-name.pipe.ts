import { Pipe, PipeTransform } from '@angular/core';
import { Meteor } from 'meteor/meteor';

import { User } from '../../../../both/models/user.model';

@Pipe({
    name: 'displayName',
    pure: false
})
export class DisplayNamePipe implements PipeTransform {
    // Transforms a user model into a friendly name
    transform(user: User): string {
        let displayName: string = '';

        // Prefer username and then email
        if (user.username) {
            displayName = user.username;
        } else if (user.emails && user.emails.length) {
            displayName = user.emails[0].address;
        }

        return displayName;
    }
}