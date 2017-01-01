import { CollectionObject } from './collection-object.model';
import { PoemLine } from './poem-line.model';

export interface Poem extends CollectionObject {
    lines: PoemLine[];
    isComplete: boolean;
    title?(): string;
}

export const PoemTransform = function(doc:Poem): Poem {
    doc.title = function(): string {
        return doc.isComplete
            ? doc.lines[0].text
            : doc.lines[doc.lines.length - 1].text;
    };

    return doc;
}