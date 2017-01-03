import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';

import 'rxjs/add/operator/map';

import { Poems } from '../../../../both/collections/poems.collection';
import { Poem } from '../../../../both/models/poem.model';
import { PoemLine } from '../../../../both/models/poem-line.model';

import template from './poem-details.component.html';

@Component({
    selector: 'poem-details',
    template
})

export class PoemDetailsComponent implements OnInit, OnDestroy {
    poemId: string;
    poem: Poem;
    poemSub: Subscription;
    paramsSub: Subscription;
    poemForm: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit() {
        // Get an existing poem from the route params
        this.paramsSub = this.route.params
            .map(params => params['poemId'])
            .subscribe(poemId => {
                this.poemId = poemId;

                if (this.poemSub) {
                    this.poemSub.unsubscribe();
                }

                this.poemSub = MeteorObservable.subscribe('poem', this.poemId).subscribe(() => {
                    this.poem = Poems.findOne(this.poemId);
                });
            });

        // Create the form
        this.poemForm = this.formBuilder.group({
            line1: ['', Validators.required],
            line2: ['', Validators.required],
            isComplete: []
        });
    }

    ngOnDestroy() {
        // Clean up the subscriptions when the component is destroyed
        this.paramsSub.unsubscribe();
        this.poemSub.unsubscribe();
    }

    savePoem() {
        // Only save if the form is valid and the user is logged in
        if (this.poemForm.valid && Meteor.userId()) {
            // Get the new lines from the form builder
            let newLines: PoemLine[] = [
                {
                    text: this.poemForm.value.line1,
                    contributorId: Meteor.userId()
                }, 
                {
                    text: this.poemForm.value.line2,
                    contributorId: Meteor.userId()
                }
            ];

            let date: Date = new Date();

            if (!this.poem) {
                // If this is a new poem, insert it
                Poems.insert({
                    lines: newLines,
                    isComplete: false,
                    creatorId: Meteor.userId(),
                    creationDate: date,
                    lastContributorId: Meteor.userId(),
                    lastModifiedDate: date
                });
            } else {
                // If this is an existing poem, append the lines
                Poems.update(this.poem._id, {
                    $set: {
                        lines: this.poem.lines.concat(newLines),
                        isComplete: this.poemForm.value.isComplete,
                        lastContributorId: Meteor.userId(),
                        lastModifiedDate: date
                    }
                });
            }

            // Navigate home
            this.router.navigate(['/']);
        }
    }
}