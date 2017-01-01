import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

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
    paramsSub: Subscription;
    poemForm: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit() {
        this.paramsSub = this.route.params
            .map(params => params['poemId'])
            .subscribe(poemId => {
                this.poemId = poemId;
                this.poem = Poems.findOne(this.poemId);
            });

        this.poemForm = this.formBuilder.group({
            line1: ['', Validators.required],
            line2: ['', Validators.required],
            isComplete: []
        });
    }

    ngOnDestroy() {
        this.paramsSub.unsubscribe();
    }

    savePoem() {
        if (this.poemForm.valid) {
            let newLines: PoemLine[] = [
                {
                    text: this.poemForm.value.line1
                }, 
                {
                    text: this.poemForm.value.line2
                }
            ];

            if (!this.poem) {
                Poems.insert({
                    lines: newLines,
                    isComplete: false
                });
            } else {
                Poems.update(this.poem._id, {
                    $set: {
                        lines: this.poem.lines.concat(newLines),
                        isComplete: this.poemForm.value.isComplete
                    }
                });
            }

            this.router.navigate(['/']);
        }
    }
}