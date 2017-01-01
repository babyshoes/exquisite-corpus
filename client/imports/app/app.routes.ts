import { Route } from '@angular/router';

import { PoemsListComponent } from './poems/poems-list.component';
import { PoemDetailsComponent } from './poems/poem-details.component';

export const routes: Route[] = [
    { path: '', component: PoemsListComponent },
    { path: 'poem/:poemId', component: PoemDetailsComponent },
    { path: 'poem', component: PoemDetailsComponent }
];