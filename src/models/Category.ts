import {SubCategory} from './SubCategory';

/** Class representing a Category. */
export class Category {

    name: string;
    url: string;
    subCategories: Array<SubCategory>;

    /**
     * Create a Category.
     * @param {string} name - The name value.
     * @param {string} url - The url value.
     * @param {Array<SubCategory>} subCategories - The subCategories values.
     */
    constructor(name?: string, url?: string, subCategories?: Array<SubCategory>) {
        this.name = name || null;
        this.url = url || null;
        this.subCategories = subCategories || null;
    }

}
