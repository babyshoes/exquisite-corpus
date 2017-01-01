import { CollectionObject } from './collection-object.model';
import { PoemLine } from './poem-line.model';

export interface Poem extends CollectionObject {
    lines: PoemLine[];
    isComplete: boolean;
    title?(): string;
}

// This transform is used by the mongo observable collection
// Any helper methods on the poem model should be added here
export const PoemTransform = function(doc:Poem): Poem {
    doc.title = function(): string {
        // The poem title is the first line for complete poems
        // and the last (visible) line for incomplete poems
        return doc.isComplete
            ? doc.lines[0].text
            : doc.lines[doc.lines.length - 1].text;
    };

    return doc;
}