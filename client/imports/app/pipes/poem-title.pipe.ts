import { Pipe, PipeTransform } from '@angular/core';
import { Meteor } from 'meteor/meteor';

import { Poem } from '../../../../both/models/poem.model';
import { PoemLine } from '../../../../both/models/poem-line.model';

@Pipe({
    name: 'poemTitle'
})
export class PoemTitlePipe implements PipeTransform {
    // Transforms a poem into its title
    transform(poem: Poem): string {
        // The poem title is the first line for complete poems
        // and the last (visible) line for incomplete poems
        return poem.isComplete
            ? poem.lines[0].text
            : _.last(poem.lines).text;
    }
}