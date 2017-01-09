import { Meteor } from 'meteor/meteor';

export interface User extends Meteor.User {}

export const UserPermissions = {
    update: function (userId: string, user: User) {
        // The current user can update their own data
        return !!userId
            && user._id == userId;
    }
};