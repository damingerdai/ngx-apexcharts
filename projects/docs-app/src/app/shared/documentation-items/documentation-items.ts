export interface DocItem {
    /** Id of the doc item. Used in the URL for linking to the doc. */
    id: string;
    /** Display name of the doc item. */
    name: string;
    /** Short summary of the doc item. */
    summary?: string;
}



export interface DocSection {
    name: string;
    summary: string;
}
