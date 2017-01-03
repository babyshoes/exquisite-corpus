import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { InjectUser } from 'angular2-meteor-accounts-ui';
import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';
import { PaginationService } from 'ng2-pagination';
import { Counts } from 'meteor/tmeasday:publish-counts';

import 'rxjs/add/operator/combineLatest';

import { Poems } from '../../../../both/collections/poems.collection';
import { Poem, PoemPermissions } from '../../../../both/models/poem.model';
import { Options } from '../../../../both/filters/pagination';

import template from './poems-list.component.html';

@Component({
    selector: 'poems-list',
    template
})
@InjectUser('user')
export class PoemsListComponent implements OnInit, OnDestroy {
    poems: Observable<Poem[]>;
    user: Meteor.User;
    poemsSub: Subscription;
    pageSize: Subject<number> = new Subject<number>();
    currentPage: Subject<number> = new Subject<number>();
    optionsSub: Subscription;
    poemsSize: number = 0;
    autorunSub: Subscription;

    constructor(
        private paginationService: PaginationService
    ) {}

    ngOnInit() {
        const defaultPageSize: number = 1;

        // Combine page size and current page into an observable and subscribe
        this.optionsSub = Observable.combineLatest(
            this.pageSize,
            this.currentPage)
        .subscribe(([pageSize, currentPage]) => {
            // Initialize subscription based on starting pageSize and currentPage
            const sort = { lastModifiedDate: -1 };
            const options: Options = {
                limit: pageSize as number,
                skip: ((currentPage as number) - 1) * (pageSize as number),
                sort: sort
            };

            this.paginationService.setCurrentPage(
                this.paginationService.defaultId(),
                currentPage as number);

            if (this.poemsSub) {
                this.poemsSub.unsubscribe();
            }

            // Subscribe to the current page of poems
            this.poemsSub = MeteorObservable.subscribe('poems', options).subscribe(() => {
                this.poems = Poems.find({}, {
                    sort: sort
                }).zone();
            });
        });

        this.paginationService.register({
            id: this.paginationService.defaultId(),
            itemsPerPage: defaultPageSize,
            currentPage: 1,
            totalItems: this.poemsSize
        });

        // Initialize paging subjects
        this.pageSize.next(defaultPageSize);
        this.currentPage.next(1);

        // Automatically update the total poem count whenever it changes
        this.autorunSub = MeteorObservable.autorun().subscribe(() => {
            this.poemsSize = Counts.get('numberOfPoems');
            this.paginationService.setTotalItems(
                this.paginationService.defaultId(),
                this.poemsSize);
        });
    }

    ngOnDestroy() {
        this.optionsSub.unsubscribe();
        this.poemsSub.unsubscribe();
        this.autorunSub.unsubscribe();
    }

    removePoem(poem: Poem): void {
        Poems.remove(poem._id);
    }

    // Determines if the current user can remove the given poem,
    // using the poem permissions
    currentUserCanRemovePoem(poem: Poem): boolean {
        return PoemPermissions.remove(Meteor.userId(), poem);
    }

    onPageChanged(page: number): void {
        this.currentPage.next(page);
    }
}