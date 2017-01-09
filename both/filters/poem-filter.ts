// Interface for optional filtering of poems
export interface PoemFilter {
    // Filters to just the poem with the specified id
    poemId?: string;

    // Filters to poems the user specified by the id has contributed to
    userId?: string;
};