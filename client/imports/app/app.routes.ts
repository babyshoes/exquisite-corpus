import { Route } from '@angular/router';

import { PoemsListComponent } from './poems/poems-list.component';
import { PoemDetailsComponent } from './poems/poem-details.component';

export const routes: Route[] = [
    // List of all poems
    { path: '', component: PoemsListComponent },
    // Details component for editing an existing poem
    { path: 'poem/:poemId', component: PoemDetailsComponent },
    // Details component for creating a new poem
    { path: 'poem', component: PoemDetailsComponent }
];