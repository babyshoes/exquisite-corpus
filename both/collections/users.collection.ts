import { MongoObservable } from 'meteor-rxjs';
import { Meteor } from 'meteor/meteor';

import { UserPermissions } from '../models/user.model';

export const Users = MongoObservable.fromExisting(Meteor.users);

Users.allow(UserPermissions);